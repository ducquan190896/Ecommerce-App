package amazon.app.backend.Service;
import java.util.List;

import amazon.app.backend.Entity.Review;
import amazon.app.backend.Entity.Request.ReviewRequest;
import amazon.app.backend.Entity.Response.ReviewResponse;

public interface ReviewService {
    List<ReviewResponse> getReviews();
    List<ReviewResponse> getReviewsByProduct(Long productId);
    List<ReviewResponse> getReviewsByUser(Long userId);
    ReviewResponse getReviewById(Long id);
    ReviewResponse saveReview(ReviewRequest reviewRequest);
    void deleteReview(Long id);
}
