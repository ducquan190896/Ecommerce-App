package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Orders;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Response.OrderItemResponse;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CartRepos;
import amazon.app.backend.Repository.OrderItemRepos;
import amazon.app.backend.Repository.OrderRepos;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Service.OrderItemService;

@Service
public class OrderItemServiceIml implements OrderItemService {
    @Autowired 
    OrderItemRepos orderItemRepos;
    @Autowired
    OrderRepos orderRepos;
    @Autowired
    CartRepos cartRepos;
    @Autowired
    UserRepos userRepos;

    @Override
    public List<OrderItemResponse> getOrderItemByOrder(Long orderId) {
        Optional<Orders> entity = orderRepos.findById(orderId);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the order not found");
        }
        Orders order = entity.get();
        List<OrderItem> list = orderItemRepos.findByOrder(order);
        List<OrderItemResponse> responses = list.stream().map(item -> convertToResponse(item)).collect(Collectors.toList());
        return responses;
    }

    @Override
    public List<OrderItemResponse> getOrderItemFromCartOfAuthUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the user not found");
        }
        Users user = entity.get();
        Cart cart = user.getCart();
        List<OrderItem> list = orderItemRepos.findByIsOrderedAndCart(false, cart);
        List<OrderItemResponse> responses = list.stream().map(item -> convertToResponse(item)).collect(Collectors.toList());
        return responses;
    }

    @Override
    public List<OrderItemResponse> getOrderItemFrombeingOrdered() {
        List<OrderItem> list = orderItemRepos.findByIsOrdered(true);
        List<OrderItemResponse> responses = list.stream().map(item -> convertToResponse(item)).collect(Collectors.toList());
        return responses;
    }
    private OrderItemResponse convertToResponse(OrderItem orderItem) {
        if(orderItem.getOrder() != null) {
            return new OrderItemResponse(orderItem.getId(), orderItem.getProduct(), orderItem.getQuantity(), orderItem.getIsOrdered(), orderItem.getOrder().getId());
        }
        return new OrderItemResponse(orderItem.getId(), orderItem.getProduct(), orderItem.getQuantity(), orderItem.getIsOrdered());
    }
}
