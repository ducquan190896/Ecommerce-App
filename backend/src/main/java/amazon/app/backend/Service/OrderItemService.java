package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Response.OrderItemResponse;

public interface OrderItemService {
    List<OrderItemResponse> getOrderItemByOrder(Long orderId);
    List<OrderItemResponse> getOrderItemFromCartOfAuthUser();
    // List<OrderItemResponse> getOrderItemByOrderStatusAndProduct(Long productId);
    List<OrderItemResponse> getOrderItemFrombeingOrdered();
    // void IncreaseItemToCart(Long productId, int quantity);
    // void decreaseItemFromCart(Long productId, int quantity);
    // void deleteItemFromCart(Long productId);
    // void saveNewItem(Long productId);
}
