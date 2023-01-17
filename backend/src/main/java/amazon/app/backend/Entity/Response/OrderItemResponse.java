package amazon.app.backend.Entity.Response;

import amazon.app.backend.Entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//this class is used for the order item in the shopping cart
public class OrderItemResponse {
    private Long id;
    private Product product;
    private int quantity;
    private boolean isOrdered;
    private Long orderId;
    
    public OrderItemResponse(Long id, Product product, int quantity, boolean isOrdered) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.isOrdered = isOrdered;
    }

    
}
