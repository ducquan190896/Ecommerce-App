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
@Table(name = "city")
@Entity(name = "City")
public class City {
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    private Country country;

    public City( String name) {
        this.name = name;
    }

    


    public City( String name, Country country) {
        this.name = name;
        this.country = country;
    }




    @Override
    public String toString() {
        return "City [id=" + id + ", name=" + name + "]";
    }


    
}
