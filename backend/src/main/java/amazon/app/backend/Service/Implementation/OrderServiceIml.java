package amazon.app.backend.Service.Implementation;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Address;
import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Orders;
import amazon.app.backend.Entity.StatusOrder;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Response.OrderResponse;
import amazon.app.backend.Entity.Response.OrderedProductResponse;
import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.AddressRepos;
import amazon.app.backend.Repository.CartRepos;
import amazon.app.backend.Repository.OrderItemRepos;
import amazon.app.backend.Repository.OrderRepos;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Service.OrderService;

@Service
public class OrderServiceIml implements OrderService {
    @Autowired
    CartRepos cartRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    AddressRepos addressRepos;
    @Autowired
    OrderItemRepos orderItemRepos;
    @Autowired
    OrderRepos orderRepos;
    

    @Override
    public OrderResponse createOrder(Long billingAddressId, Long shippingAddressId) {
       
        Users user = getAuthUser();
        Cart cart = user.getCart();
        Set<OrderItem> itemList = cart.getOrderItems();
        if(itemList.size() <= 0) {
            throw new BadResultException("the cart has no orderItems, cannot checkout the order");
        }
       String trackingNumber = UUID.randomUUID().toString();       
        Address billingAddress = getAddressById(billingAddressId);
        Address shippingAddress = getAddressById(shippingAddressId);      
         Set<OrderItem> newItemList = new HashSet<>();
      

        Orders order = new Orders(user, trackingNumber, cart.getTotalPrice(), cart.getTotalQuantity(), billingAddress, shippingAddress);
        billingAddress.setOrder(order);
        shippingAddress.setOrder(order);
        orderRepos.save(order);
       

      
        itemList.stream().forEach(ite -> {
            newItemList.add(ite);
            ite.setOrder(order);
            ite.setOrdered(true);
            orderItemRepos.save(ite);
        });
        order.setOrderItems(newItemList);
        orderRepos.save(order);
       

        Set<OrderedProductResponse> itemResponses = itemList.stream().map(ite -> {
           
            return convertToProductResponse(ite);
        }).collect(Collectors.toSet());

      
        cart = clearCart(cart);
        user.setCart(cart);
        user.getOrderList().add(order);
        userRepos.save(user);
        
       
        OrderResponse response = new OrderResponse(order.getId(), user.getUsername(), user.getEmail(), trackingNumber, order.getStatus(), order.getTotalPrice(), order.getTotalQuantity(), order.getDateCreated(), order.getDateUpdated(), shippingAddress, billingAddress, itemResponses);
        
        return response;
    }

    @Override
    public OrderResponse getOrderById(Long id) {
       Optional<Orders> entity = orderRepos.findById(id);
       Orders order = isCheckOrder(entity);
        Set<OrderItem> itemList = order.getOrderItems();
        Set<OrderedProductResponse> itemResponses = itemList.stream().map(ite -> convertToProductResponse(ite)).collect(Collectors.toSet());

   
       OrderResponse response = new OrderResponse(order.getId(), order.getUser().getUsername(), order.getUser().getEmail(), order.getTrackingNumber(), order.getStatus(), order.getTotalPrice(), order.getTotalQuantity(), order.getDateCreated(), order.getDateUpdated(), order.getShippingAddress(), order.getBillingAddress(), itemResponses );
       return response;
    }



    @Override
    public OrderResponse completeOrder(Long id) {
        Optional<Orders> entity = orderRepos.findById(id);
        Orders order = isCheckOrder(entity);
        order.setStatus(StatusOrder.CLOSE);
        orderRepos.save(order);

        System.out.println(order);

        Set<OrderItem> itemList = order.getOrderItems();
        Set<OrderedProductResponse> itemResponses = itemList.stream().map(ite -> convertToProductResponse(ite)).collect(Collectors.toSet());

   
       OrderResponse response = new OrderResponse(order.getId(), order.getUser().getUsername(), order.getUser().getEmail(), order.getTrackingNumber(), order.getStatus(), order.getTotalPrice(), order.getTotalQuantity(), order.getDateCreated(), order.getDateUpdated(), order.getShippingAddress(), order.getBillingAddress(), itemResponses );
       return response;
    }

    @Override
    public void deleteOrder(Long id) {
        Optional<Orders> entity = orderRepos.findById(id);
        Orders order = isCheckOrder(entity);
        orderRepos.delete(order);
        
    }

    @Override
    public List<OrderResponse> getOrders() {
       List<Orders> orders = orderRepos.findAll(Sort.by(Sort.Direction.ASC, "dateUpdated"));
       List<OrderResponse> responses = convertToListResponse(orders);
       return responses;
    }

    @Override
    public List<OrderResponse> getOrdersByStatus(StatusOrder status) {
        List<Orders> orders = orderRepos.findByStatus(status);
        orders.sort((a, b) -> a.getDateUpdated().compareTo(b.getDateUpdated()));
        
        List<OrderResponse> responses = convertToListResponse(orders);
        return responses;
    }

    @Override
    public List<OrderResponse> getOrdersByUser(Long userId) {
        Optional<Users> entity = userRepos.findById(userId);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("auth user not found");
        }
        Users user = entity.get();
        List<Orders> orders = orderRepos.findByUser(user);
        orders.sort((a, b) -> a.getStatus().compareTo(b.getStatus()));
        
        List<OrderResponse> responses = convertToListResponse(orders);
        return responses;
    }

    @Override
    public List<OrderResponse> getOrdersByAuthUser() {
        Users user = getAuthUser();
        List<Orders> orders = orderRepos.findByUser(user);
        orders.sort((a, b) -> a.getStatus().compareTo(b.getStatus()));
        
        List<OrderResponse> responses = convertToListResponse(orders);
        return responses;
    }

    private Address getAddressById(Long id) {
        Optional<Address> entity = addressRepos.findById(id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the address not found");
        }
        return entity.get();
    }

    private Users getAuthUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("auth user not found");
        }
        return entity.get();

    }
    private OrderedProductResponse convertToProductResponse(OrderItem item) {
        OrderedProductResponse res = new OrderedProductResponse(item.getProduct().getId(), item.getProduct().getName(), item.getProduct().getProductCode(), item.getProduct().getPrice(), item.getQuantity());
        if(item.getProduct().getImageUrls().size() > 0) {
            res.setImageUrl(item.getProduct().getImageUrls().get(0));
        }
        item.setOrdered(true);
       
        return res;
    }
    private Cart clearCart(Cart cart) {
        Set<OrderItem> orderItems = cart.getOrderItems();
        cart.setOrderItems(new HashSet<>());
        if(orderItems.size() > 0) {
            orderItems.stream().forEach(item -> {
                item.setCart(null);
                orderItemRepos.save(item);
            });
        }
       
        cart.setTotalPrice(0);
        cart.setTotalQuantity(0);
        return cartRepos.save(cart);
    }

    private Orders isCheckOrder(Optional<Orders> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the order not found");
    }

    private List<OrderResponse> convertToListResponse(List<Orders> orders) {
        List<OrderResponse> list = orders.stream().map(order -> new OrderResponse(order.getId(), order.getUser().getUsername(), order.getUser().getEmail(), order.getTrackingNumber(), order.getStatus(), order.getTotalPrice(), order.getTotalQuantity(), order.getDateCreated(), order.getDateUpdated(), order.getShippingAddress(), order.getBillingAddress())).collect(Collectors.toList());
        return list;
    }
    

    

   
}
