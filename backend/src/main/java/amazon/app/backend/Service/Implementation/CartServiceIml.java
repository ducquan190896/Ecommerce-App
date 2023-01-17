package amazon.app.backend.Service.Implementation;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Response.CartResponse;
import amazon.app.backend.Entity.Response.OrderItemResponse;
import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CartRepos;
import amazon.app.backend.Repository.OrderItemRepos;
import amazon.app.backend.Repository.ProductRepos;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Service.CartService;
import amazon.app.backend.Service.OrderItemService;

@Service
public class CartServiceIml implements CartService {
    @Autowired
    ProductRepos productRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    CartRepos cartRepos;
    @Autowired
    OrderItemService orderItemService;
    @Autowired
    OrderItemRepos orderItemRepos;
    @Override
    public CartResponse addToCart(Long productId, int quantity) {
        Users user = getAuthUser();
        Cart cart = user.getCart();
        Optional<Product> productEntity = productRepos.findById(productId);
        if(!productEntity.isPresent()) {
            throw new EntityNotFoundException("the product not found");
        }
        Product product = productEntity.get();

        Set<OrderItem> items = cart.getOrderItems();
        


        List<OrderItem> checkList = items.stream().filter(ite -> ite.getProduct().getId() == productId).collect(Collectors.toList());
        if(checkList.size() > 0) {
                     OrderItem ite = checkList.get(0);
                     ite.setQuantity(ite.getQuantity() + quantity);
                    orderItemRepos.save(ite);

                    cart.setOrderItems(cart.getOrderItems().stream().map(orIte -> orIte.equals(ite) ? ite : orIte).collect(Collectors.toSet()));

                    cart.setTotalQuantity(cart.getTotalQuantity() + quantity);
                    cart.setTotalPrice(cart.getTotalPrice() + (product.getPrice() * quantity));
        } else {
                 OrderItem orderItem = new OrderItem(product, quantity, cart);
                orderItemRepos.save(orderItem);
                cart.setTotalQuantity(cart.getTotalQuantity() + quantity);
                cart.setTotalPrice(cart.getTotalPrice() + (product.getPrice() * quantity));
                cart.getOrderItems().add(orderItem);
        }

        cartRepos.save(cart);
        items = cart.getOrderItems();
        userRepos.save(user);
        Set<OrderItemResponse> responseItems = items.stream().map(ite -> convertToResponse(ite)).collect(Collectors.toSet());

        CartResponse cartResponse = new CartResponse(cart.getId(), user.getId(), cart.getTotalPrice(), cart.getTotalQuantity(), responseItems, cart.getDateUpdated());
        return cartResponse;

    }
    @Override
    public CartResponse clearCart() {
        Users user = getAuthUser();
        Cart cart = user.getCart();
        cart.setOrderItems(new HashSet<>());
        cart.setTotalPrice(0);
        cart.setTotalQuantity(0);
        cartRepos.save(cart);
        userRepos.save(user);
        Set<OrderItemResponse> orderItemResponse = new HashSet<>();
        CartResponse cartResponse = new CartResponse(cart.getId(), user.getId(), cart.getTotalPrice(), cart.getTotalQuantity(), orderItemResponse , cart.getDateUpdated());
        return cartResponse;
    }

    @Override
    public CartResponse minusFromCart(Long productId, int quantity) {
        Users user = getAuthUser();
        Cart cart = user.getCart();
        Optional<Product> productEntity = productRepos.findById(productId);
        if(!productEntity.isPresent()) {
            throw new EntityNotFoundException("the product not found");
        }
        Product product = productEntity.get();

        Set<OrderItem> items = cart.getOrderItems();

        List<OrderItem> checkList = items.stream().filter(ite -> ite.getProduct().getId() == productId).collect(Collectors.toList());
        if(checkList.size() > 0) {
                     OrderItem ite = checkList.get(0);
                   if(ite.getQuantity() - quantity > 0) {
                    ite.setQuantity(ite.getQuantity() - quantity);
                    orderItemRepos.save(ite);

                    cart.setOrderItems(cart.getOrderItems().stream().map(orIte -> orIte.equals(ite) ? ite : orIte).collect(Collectors.toSet()));

                    cart.setTotalQuantity(cart.getTotalQuantity() - quantity);
                    cart.setTotalPrice(cart.getTotalPrice() - (product.getPrice() * quantity));
                   } else if(ite.getQuantity() - quantity == 0) {
                    cart.getOrderItems().remove(ite);
                    orderItemRepos.delete(ite);
                   } else {
                    throw new BadResultException("the quantity decreased is larger than the quantiy of productItem in the cart");
                   }
        } else {
                
                throw new BadResultException("the productItem with  product Id " + productId + " not found in the cart");
        }
        
        cartRepos.save(cart);
        items = cart.getOrderItems();
        userRepos.save(user);
        Set<OrderItemResponse> responseItems = items.stream().map(ite -> convertToResponse(ite)).collect(Collectors.toSet());

        CartResponse cartResponse = new CartResponse(cart.getId(), user.getId(), cart.getTotalPrice(), cart.getTotalQuantity(), responseItems, cart.getDateUpdated());
        return cartResponse;
    }

    


    @Override
    public CartResponse getCartByAuthUser() {
        Users user = getAuthUser();
        Cart cart = user.getCart();

        Set<OrderItem>  items = cart.getOrderItems();
        Set<OrderItemResponse> responseItems = new HashSet<>();
        if(items.size() > 0) {
            responseItems = items.stream().map(ite -> convertToResponse(ite)).collect(Collectors.toSet());
        }
      

        CartResponse cartResponse = new CartResponse(cart.getId(), user.getId(), cart.getTotalPrice(), cart.getTotalQuantity(), responseItems, cart.getDateUpdated());
        return cartResponse;
    }



    private Users getAuthUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("username of auth user not found");
        }
        Users user = entity.get();
        return user;
    }

    private OrderItemResponse convertToResponse(OrderItem orderItem) {
        if(orderItem.getOrder() != null) {
            return new OrderItemResponse(orderItem.getId(), orderItem.getProduct(), orderItem.getQuantity(), orderItem.getIsOrdered(), orderItem.getOrder().getId());
        }
        return new OrderItemResponse(orderItem.getId(), orderItem.getProduct(), orderItem.getQuantity(), orderItem.getIsOrdered());
    }
   
}
