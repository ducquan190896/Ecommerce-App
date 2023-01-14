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
@Table(name = "brand")
@Entity(name = "Brand")
public class Brand {
    @Id
    @SequenceGenerator(
        name = "brand_sequence",
        sequenceName = "brand_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "brand_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank(message = "name of brand cannot blank")
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "brand", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Product> products = new HashSet<>();

    public Brand( String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Brand [id=" + id + ", name=" + name + "]";
    }

    

}
