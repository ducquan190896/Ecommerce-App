package amazon.app.backend.Entity.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//this class is used for the response of order bill
public class OrderedProductResponse {
    private Long productId;
    private String imageUrl;
    private String name;
    private String productCode;
    private double unitPrice;
    private int quantity;
    public OrderedProductResponse(Long productId, String name, String productCode, double unitPrice, int quantity) {
        this.productId = productId;
        this.name = name;
        this.productCode = productCode;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }
    
}
