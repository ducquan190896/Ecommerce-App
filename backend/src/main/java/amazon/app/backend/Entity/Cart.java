package amazon.app.backend.Entity;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
@Table(name = "cart")
@Entity(name = "Cart") 
public class Cart {
    @Id
    @SequenceGenerator(
        name = "cart_sequence",
        sequenceName = "cart_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "cart_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @OneToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    //check when turn cart into order, the order items must be an empty set, check cascade.all and bidirectional relationship
    @JsonIgnore
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private Set<OrderItem> orderItems = new HashSet<>();

    @Min(value = 0, message = "total price of cart cannot be less than 0")
    @Column(name = "total_price")
    private double totalPrice;

    @Min(value = 0, message = "total quantity of cart cannot be less than 0")
    @Column(name = "total_quantity")
    private int totalQuantity;

    public Cart(Users user) {
        this.user = user;
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.orderItems = new HashSet<>();
    }

    @Override
    public String toString() {
        return "Cart [id=" + id + ", user=" + user + ", totalPrice=" + totalPrice + ", totalQuantity=" + totalQuantity
                + "]";
    }

    // public void addToCart(Product product) {
    //     Set<OrderItem> items = this.orderItems.stream().filter(i -> i.getProduct().getId() == product.getId()).collect(Collectors.toSet());
    //     if(items.size() ==  0) {
    //         OrderItem newItem = new OrderItem(product, 1, this);
    //         this.orderItems.add(newItem);
    //         this.totalPrice = this.totalPrice + product.getPrice();
    //     } else if(items.size() >  0){
    //         this.orderItems.stream().forEach(it -> {
    //             if(it.getProduct().getId() == product.getId()) {
    //                 it.setQuantity(it.getQuantity() + 1);
    //             }              
    //         });
    //         this.totalPrice = this.totalPrice + product.getPrice();
    //     }
        

    // }

  
    
}
