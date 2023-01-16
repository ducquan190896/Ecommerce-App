package amazon.app.backend.Entity;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users user;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm")
    @CreationTimestamp
    @Column(name = "date_Created")
    private LocalDateTime dateCreated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm")
    @CreationTimestamp
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

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
