package amazon.app.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Response.OrderItemResponse;
import amazon.app.backend.Service.OrderItemService;

@RequestMapping("/api/orderItems")
@RestController
public class OrderItemController {
    @Autowired
    OrderItemService orderItemService;

    @GetMapping("/cartOfAuthUser")
    public ResponseEntity<List<OrderItemResponse>> getFromCart() {
        return new ResponseEntity<List<OrderItemResponse>>(orderItemService.getOrderItemFromCartOfAuthUser(), HttpStatus.OK);
    }
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItemResponse>> getByOrder(@PathVariable Long orderId) {
        return new ResponseEntity<List<OrderItemResponse>>(orderItemService.getOrderItemByOrder(orderId), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/beingOrdered")
    public ResponseEntity<List<OrderItemResponse>> getByBeingOrdered() {
        return new ResponseEntity<List<OrderItemResponse>>(orderItemService.getOrderItemFrombeingOrdered(), HttpStatus.OK);
    }
}
