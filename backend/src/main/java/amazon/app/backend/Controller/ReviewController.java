package amazon.app.backend.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Review;
import amazon.app.backend.Entity.Request.ReviewRequest;
import amazon.app.backend.Entity.Response.ReviewResponse;
import amazon.app.backend.Service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @GetMapping("/all")
    public ResponseEntity<List<ReviewResponse>> getAll() {
        return new ResponseEntity<List<ReviewResponse>>(reviewService.getReviews(), HttpStatus.OK);
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<List<ReviewResponse>> getAllByProduct(@PathVariable Long id) {
        return new ResponseEntity<List<ReviewResponse>>(reviewService.getReviewsByProduct(id), HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<List<ReviewResponse>> getAllByUser(@PathVariable Long id) {
        return new ResponseEntity<List<ReviewResponse>>(reviewService.getReviewsByUser(id), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long id) {
        return new ResponseEntity<ReviewResponse>(reviewService.getReviewById(id), HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<ReviewResponse> addReview(@Valid @RequestBody ReviewRequest reviewRequest) {
        return new ResponseEntity<ReviewResponse>(reviewService.saveReview(reviewRequest), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
