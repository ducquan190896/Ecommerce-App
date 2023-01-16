package amazon.app.backend.Entity.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    private int rating;
    private String description;
    private Long productId;
    public ReviewRequest(int rating, Long productId) {
        this.rating = rating;
        this.productId = productId;
    }
    
}
