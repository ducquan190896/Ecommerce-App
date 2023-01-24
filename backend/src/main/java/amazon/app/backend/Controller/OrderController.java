package amazon.app.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.StatusOrder;
import amazon.app.backend.Entity.Response.OrderResponse;
import amazon.app.backend.Service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<OrderResponse>> getAll() {
        return new ResponseEntity<>(orderService.getOrders(), HttpStatus.OK);
    }
    @GetMapping("/allByAuthUser")
    public ResponseEntity<List<OrderResponse>> getAllByAuthUser() {
        return new ResponseEntity<>(orderService.getOrdersByAuthUser(), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allByUserId/{userId}")
    public ResponseEntity<List<OrderResponse>> getAllByUser(@PathVariable Long userId) {
        return new ResponseEntity<>(orderService.getOrdersByUser(userId), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allByOpenStatus")
    public ResponseEntity<List<OrderResponse>> getAllByOpenStatus() {
        return new ResponseEntity<>(orderService.getOrdersByStatus(StatusOrder.OPEN), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/allByCloseStatus")
    public ResponseEntity<List<OrderResponse>> getAllByCloseStatus() {
        return new ResponseEntity<>(orderService.getOrdersByStatus(StatusOrder.CLOSE), HttpStatus.OK);
    }
   // @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/id/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<OrderResponse> updateCompleteStatusOfOrder(@PathVariable Long id) {
        return new ResponseEntity<>(orderService.completeOrder(id), HttpStatus.ACCEPTED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }
    @PostMapping("/billingAddress/{billingAddressId}/shippingAddress/{shippingAddressId}")
    public ResponseEntity<OrderResponse> checkoutOrder(@PathVariable Long billingAddressId, @PathVariable Long shippingAddressId) {
        System.out.println("hello");
        return new ResponseEntity<>(orderService.createOrder(billingAddressId, shippingAddressId), HttpStatus.CREATED);
    }
}
