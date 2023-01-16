package amazon.app.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Review;
import amazon.app.backend.Entity.Users;

@Repository
public interface ReviewRepos extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
    List<Review> findByUser(Users user);
}
