package amazon.app.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Brand;

@Repository
public interface BrandRepos extends JpaRepository<Brand, Long>  {
    Optional<Brand> findByName(String name);

}
