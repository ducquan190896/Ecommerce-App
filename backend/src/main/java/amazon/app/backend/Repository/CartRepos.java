package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Cart;

@Repository
public interface CartRepos extends JpaRepository<Cart, Long> {
    
}
