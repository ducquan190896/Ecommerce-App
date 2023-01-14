package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Orders;

@Repository
public interface OrderRepos extends JpaRepository<Orders, Long> {
    
}
