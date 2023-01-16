package amazon.app.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Category;

@Repository
public interface CategoryRepos extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);
}
