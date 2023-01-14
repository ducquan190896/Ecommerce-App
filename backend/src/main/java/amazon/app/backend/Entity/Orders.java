package amazon.app.backend.Entity;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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
@Table(name = "orders")
@Entity(name = "Orders") 
public class Orders {
    @Id
    @SequenceGenerator(
        name = "orders_sequence",
        sequenceName = "orders_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "orders_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    @NotBlank(message = "tracking number cannot be null")
    @Column(name = "tracking_number", nullable = false)
    private String trackingNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusOrder status;

    @Min(value = 0, message = "total price cannot be less than 0")
    @Column(name = "total_price")
    private double totalPrice;

    @Min(value = 0, message = "total quantity cannot be less than 0")
    @Column(name = "total_quantity")
    private int totalQuantity;

    @CreationTimestamp
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @UpdateTimestamp
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems = new HashSet<>();

    //check ignore json
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "billing_address", referencedColumnName = "id")
    private Address billingAddress;

    //check ignore json
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "shipping_address", referencedColumnName = "id")
    private Address shippingAddress;

    public Orders(Users user,  String trackingNumber,  double totalPrice, int totalQuantity, Set<OrderItem> orderItems, Address billingAddress, Address shippingAddress) {
        this.user = user;
        this.trackingNumber = trackingNumber;
        this.status = StatusOrder.OPEN;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.orderItems = orderItems;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
    }
    

    public Orders(Users user,  String trackingNumber, double totalPrice, int totalQuantity) {
        this.user = user;
        this.trackingNumber = trackingNumber;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.status = StatusOrder.OPEN;
    }


    @Override
    public String toString() {
        return "Orders [id=" + id + ", user=" + user + ", trackingNumber=" + trackingNumber + ", status=" + status
                + ", totalPrice=" + totalPrice + ", totalQuantity=" + totalQuantity + ", dateCreated=" + dateCreated
                + ", dateUpdated=" + dateUpdated + ", billingAddress=" + billingAddress + ", shippingAddress="
                + shippingAddress + "]";
    }

    
}
