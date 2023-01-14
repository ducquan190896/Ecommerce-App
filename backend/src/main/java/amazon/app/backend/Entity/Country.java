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
@Table(name = "country")
@Entity(name = "Country")
public class Country {
    @Id
    @SequenceGenerator(
        name = "country_sequence",
        sequenceName = "country_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "country_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank(message = "name of country cannot be blank")
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "country", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<City> cities = new HashSet<>();

    public Country( String name) {
        this.name = name;
    }



    @Override
    public String toString() {
        return "Country [id=" + id + ", name=" + name + "]";
    }


    

}
