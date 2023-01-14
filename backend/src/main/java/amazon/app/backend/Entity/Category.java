package amazon.app.backend.Entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
@Entity(name = "Category")
public class Category {
    @Id
    @SequenceGenerator(
        name = "category_sequence",
        sequenceName = "category_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "category_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;
    
    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL,  fetch = FetchType.LAZY)
    private Set<Product> products = new HashSet<>();

    public Category(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + "]";
    }

    

}
