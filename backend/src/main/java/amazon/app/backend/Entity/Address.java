package amazon.app.backend.Entity;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address")
@Entity(name = "Address") 
public class Address {
    @Id
    @SequenceGenerator(
        name = "address_sequence",
        sequenceName = "address_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "address_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @NotBlank(message = "street cannot be blank")
    @Column(name = "street", nullable = false)
    private String street;

    @NotBlank(message = "city cannot be blank")
    @Column(name = "city", nullable = false)
    private String city;

    @NotBlank(message = "country cannot be blank")
    @Column(name = "country", nullable = false)
    private String country;

    @NotBlank(message = "zipCode cannot be blank")
    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @Column(name = "is_billing")
    private boolean isBilling;

    @Column(name = "is_shipping")
    private boolean isShipping;

    @JsonIgnore
    @OneToOne
    @PrimaryKeyJoinColumn
    private Orders order;
    

    public Address(String street, String city, String country, String zipCode) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.isBilling = false;
        this.isShipping = false;
        
    }
    public Address(String street, String city, String country, String zipCode, Orders order) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.isBilling = false;
        this.isShipping = false;
        this.order = order;
    }

    


    public Address(String street, String city, String country, String zipCode, boolean isBilling, boolean isShipping, Orders order) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.isBilling = isBilling;
        this.isShipping = isShipping;
        this.order = order;
    }
    public Address(String street, String city, String country, String zipCode, boolean isBilling, boolean isShipping) {
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.isBilling = isBilling;
        this.isShipping = isShipping;
        
    }
    @Override
    public String toString() {
        return "Address [id=" + id + ", street=" + street + ", city=" + city + ", country=" + country + ", zipCode="
                + zipCode + "]";
    }

    
}
