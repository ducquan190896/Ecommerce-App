package amazon.app.backend.Entity.Response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long id;
    private String description;
    private int rating;
    private Long productId;
    private String username;  
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime dateCreated;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime dateUpdated;

    public ReviewResponse(Long id, int rating, Long productId, String username, LocalDateTime dateCreated,
            LocalDateTime dateUpdated) {
        this.id = id;
        this.rating = rating;
        this.productId = productId;
        this.username = username;
        this.dateCreated = dateCreated;
        this.dateUpdated = dateUpdated;
    }  

    
}
