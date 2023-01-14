package amazon.app.backend.Entity;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orderItem", uniqueConstraints = {@UniqueConstraint(columnNames = {"product_id", "order_id"})})
@Entity(name = "OrderItem") 
public class OrderItem {
    @Id
    @SequenceGenerator(
        name = "orderItem_sequence",
        sequenceName = "orderItem_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "orderItem_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product  product;

    @Min(value = 0, message = "quantity cannot be less than 0" )
    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "is_ordered")
    private boolean isOrdered;
    
    @ManyToOne()
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;

    @ManyToOne()
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Orders order;

    public OrderItem(Product product, int quantity, Cart cart) {
        this.product = product;
        this.quantity = quantity;
        this.cart = cart;
        this.isOrdered = false;
    }


    
}
