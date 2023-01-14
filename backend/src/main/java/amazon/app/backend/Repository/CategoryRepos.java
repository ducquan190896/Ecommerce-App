package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Category;

@Repository
public interface CategoryRepos extends JpaRepository<Category, Long> {
    
}
