package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Product;

@Repository
public interface ProductRepos extends JpaRepository<Product, Long> {
    
}
