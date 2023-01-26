package amazon.app.backend.Service;

import java.util.List;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import amazon.app.backend.Entity.StatusOrder;
import amazon.app.backend.Entity.Request.PaymentInfor;
import amazon.app.backend.Entity.Response.OrderResponse;

public interface OrderService {
    OrderResponse createOrder(Long billingAddressId, Long shippingAddressId);
    OrderResponse getOrderById(Long id);
    OrderResponse completeOrder(Long id);
    List<OrderResponse> getOrders();
    List<OrderResponse> getOrdersByUser(Long userId);
    List<OrderResponse> getOrdersByStatus(StatusOrder status);
    List<OrderResponse> getOrdersByAuthUser();
    void deleteOrder(Long id);
    PaymentIntent createPaymentIntent(PaymentInfor paymentInfor) ;
}
