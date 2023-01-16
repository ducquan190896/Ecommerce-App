package amazon.app.backend.Entity.Request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class productUpdateRequest {
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Integer unitsInStock;
    private Boolean active;


}
