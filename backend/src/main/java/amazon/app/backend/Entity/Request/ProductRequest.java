package amazon.app.backend.Entity.Request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private int unitsInStock;
    private String brandName;
    private String categoryName;
    
    public ProductRequest( String name, String description, double price, int unitsInStock, String brandName, String categoryName) {
       
        this.name = name;
        this.description = description;
        this.price = price;
        this.unitsInStock = unitsInStock;
        this.brandName = brandName;
        this.categoryName = categoryName;
    }

}
