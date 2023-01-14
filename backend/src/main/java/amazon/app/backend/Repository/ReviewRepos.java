package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Review;

@Repository
public interface ReviewRepos extends JpaRepository<Review, Long> {
    
}
