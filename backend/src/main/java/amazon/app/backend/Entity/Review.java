package amazon.app.backend.Entity;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import amazon.app.backend.Validator.RatingSize;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review", uniqueConstraints = {@UniqueConstraint(columnNames = {"product_id", "user_id"})})
@Entity(name = "Review")
public class Review {
    @Id
    @SequenceGenerator(
        name = "review_sequence",
        sequenceName = "review_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "review_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "description")
    private String description;

    @RatingSize
    @Column(name = "rating")
    private int rating;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    public Review(int rating, Product product, Users user) {
        this.rating = rating;
        this.product = product;
        this.user = user;
    }

    public Review(String description, int rating, Product product, Users user) {
        this.description = description;
        this.rating = rating;
        this.product = product;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Review [id=" + id + ", description=" + description + ", rating=" + rating + ", product=" + product
                + ", user=" + user + "]";
    }

    
    
}
