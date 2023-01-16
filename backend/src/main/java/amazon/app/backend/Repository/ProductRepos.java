package amazon.app.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Brand;
import amazon.app.backend.Entity.Category;
import amazon.app.backend.Entity.Product;

@Repository
public interface ProductRepos extends JpaRepository<Product, Long> {
    Optional<Product> findByProductCode(String productCode);
    Optional<Product> findByName(String name);
    List<Product> findByNameContaining(String name);
    List<Product> findByActive(boolean active);
    List<Product> findByBrand(Brand brand);
    List<Product> findByCategory(Category category);
}
