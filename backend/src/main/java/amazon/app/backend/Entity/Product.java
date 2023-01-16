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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import amazon.app.backend.Validator.IsDiscount;
import amazon.app.backend.Validator.RatingSize;
import amazon.app.backend.Validator.isActiveProduct;
import lombok.*;


@IsDiscount
@isActiveProduct
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product", uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "product_code"})})
@Entity(name = "Product") 
public class Product {
    @Id
    @SequenceGenerator(
        name = "product_sequence",
        sequenceName = "product_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "product_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

   
    @NotBlank(message = "name cannot be blank")
    @Column(name = "name", nullable = false)
    private String name;

    

    @NotBlank(message = "productCode cannot be blank")
    @Column(name = "product_code", nullable = false)
    private String productCode;

    @NotBlank(message = "description cannot be blank")
    @Column(name = "description", nullable = false)
    private String description;

    @Min(value = 0, message = "price cannot be smaller than 0")
    @Column(name = "price")
    private double price;

    @Min(value = 0, message = "price discounted cannot be smaller than 0")
    @Column(name = "price_discounted")
    private double priceDiscounted;
  
    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Min(value = 0, message = "units in Stock cannot be smaller than 0")
    @Column(name = "units_in_stock")
    private int unitsInStock;

    @RatingSize
    @Column(name = "rating")
    private Integer rating;
    
    @CreationTimestamp
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @UpdateTimestamp
    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private Set<Review> reviews = new HashSet<>();
    
 

    public Product(String name, String description, double price, String imageUrl, int unitsInStock, Brand brand, String productCode, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.unitsInStock = unitsInStock;
        this.active = false;
        this.rating = null;
        this.brand = brand;
        this.productCode = productCode;
        this.category = category;
        this.priceDiscounted = 0;
    }

    public Product(String name, String description, double price, int unitsInStock, Brand brand, String productCode, Category category, boolean active, double priceDiscounted) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.unitsInStock = unitsInStock;
        this.active = active;
        this.rating = null;
        this.brand = brand;
        this.productCode = productCode;
        this.category = category;
        this.priceDiscounted = 0;
        this.imageUrl = null;
        this.priceDiscounted = priceDiscounted;
    }
    public Product(String name, String description, double price, int unitsInStock, Brand brand, String productCode, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.unitsInStock = unitsInStock;
        this.active = false;
        this.rating = null;
        this.imageUrl = null;
        this.brand = brand;
        this.productCode = productCode;
        this.category = category;
        this.priceDiscounted = 0;
    }
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + name + ", brand=" + brand + ", productCode=" + productCode
                + ", description=" + description + ", price=" + price + ", imageUrl=" + imageUrl + ", active=" + active
                + ", unitsInStock=" + unitsInStock + ", rating=" + rating + ", dateCreated=" + dateCreated
                + ", dateUpdated=" + dateUpdated + "]";
    }



    public boolean getActive() {
        return this.active;
    }

}
