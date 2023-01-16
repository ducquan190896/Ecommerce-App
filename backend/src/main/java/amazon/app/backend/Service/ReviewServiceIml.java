package amazon.app.backend.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Review;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Request.ReviewRequest;
import amazon.app.backend.Entity.Response.ReviewResponse;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.ProductRepos;
import amazon.app.backend.Repository.ReviewRepos;
import amazon.app.backend.Repository.UserRepos;

@Service
public class ReviewServiceIml  implements ReviewService{
    @Autowired
    ReviewRepos reviewRepos;
    @Autowired
    UserRepos userRepos;
    @Autowired
    ProductRepos productRepos;
    @Override
    public ReviewResponse getReviewById(Long id) {
      Optional<Review> entity = reviewRepos.findById(id);
      if(!entity.isPresent()) {
        throw new EntityNotFoundException("the review not found");
      }
      Review review = entity.get();
      ReviewResponse response = convertToResponse(review);
      return response;
    }
    @Override
    public List<ReviewResponse> getReviews() {
      List<Review> list = reviewRepos.findAll(Sort.by(Sort.Direction.DESC, "dateUpdated"));
    
      List<ReviewResponse> responses = list.stream().map(re -> convertToResponse(re)).collect(Collectors.toList());
      return responses;
       
    }
    @Override
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
      Optional<Product> entityProduct = productRepos.findById(productId);
      if(!entityProduct.isPresent()) {
        throw new EntityNotFoundException("the product not found");
      }
      Product product = entityProduct.get();
      List<Review> list = reviewRepos.findByProduct(product);

      list.sort((a , b) -> a.getDateUpdated().compareTo(b.getDateUpdated()));
    
      List<ReviewResponse> responses = list.stream().map(re -> convertToResponse(re)).collect(Collectors.toList());
      return responses;
    }
    @Override
    public List<ReviewResponse> getReviewsByUser(Long userId) {
        Optional<Users> entityUser = userRepos.findById(userId);
        if(!entityUser.isPresent()) {
          throw new EntityNotFoundException("the user not found");
        }
        Users user = entityUser.get();
        List<Review> list = reviewRepos.findByUser(user);
  
        list.sort((a , b) -> a.getDateUpdated().compareTo(b.getDateUpdated()));
      
        List<ReviewResponse> responses = list.stream().map(re -> convertToResponse(re)).collect(Collectors.toList());
        return responses;
    }
    @Override
    public ReviewResponse saveReview(ReviewRequest reviewRequest) {
      String username = SecurityContextHolder.getContext().getAuthentication().getName();
      Users user = userRepos.findByUsername(username).get();
      Optional<Product> entityProduct = productRepos.findById(reviewRequest.getProductId());
      if(!entityProduct.isPresent()) {
        throw new EntityNotFoundException("the product not found");
      }
      Product product = entityProduct.get();
      Review review = new Review(reviewRequest.getRating(), product, user);
      if(reviewRequest.getDescription() != null) {
        review.setDescription(reviewRequest.getDescription());
      }
       reviewRepos.save(review);
      user.getReviews().add(review);
      product.getReviews().add(review);
      if(product.getRating() == null) {
        product.setRating(review.getRating());
      } else {
        product.setRating((product.getRating() + review.getRating())/ 2);
      }
     
      productRepos.save(product);
      userRepos.save(user);
      ReviewResponse response = convertToResponse(review);
      return response;
    }

    private ReviewResponse convertToResponse(Review review) {
        if(review.getDescription() != null) {
            return new ReviewResponse(review.getId(), review.getDescription(), review.getRating(), review.getProduct().getId(), review.getUser().getUsername(), review.getDateCreated(), review.getDateUpdated());
        } 
        return new ReviewResponse(review.getId(), review.getRating(), review.getProduct().getId(), review.getUser().getUsername(), review.getDateCreated(), review.getDateUpdated());
    }
    @Override
    public void deleteReview(Long id) {
        Optional<Review> entity = reviewRepos.findById(id);
      if(!entity.isPresent()) {
        throw new EntityNotFoundException("the review not found");
      }
      Review review = entity.get();
      reviewRepos.delete(review);
    } 
    
}
