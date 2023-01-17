package amazon.app.backend.Entity.Response;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import amazon.app.backend.Entity.Address;
import amazon.app.backend.Entity.StatusOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String username;
    private String email;
    private String trackingNumber;
    private StatusOrder status;
    private double totalPrice;
    private int totalQuantity;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateCreated;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateUpdated;
    private Address shippingAddress;
    private Address billingAddress;
    private Set<OrderedProductResponse> orderedProducts = new HashSet<>();

    
    public OrderResponse(Long id, String username, String email, String trackingNumber, StatusOrder status,
            double totalPrice, int totalQuantity, LocalDateTime dateCreated, LocalDateTime dateUpdated,
            Address shippingAddress, Address billingAddress) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.trackingNumber = trackingNumber;
        this.status = status;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
    }
    
    
}
