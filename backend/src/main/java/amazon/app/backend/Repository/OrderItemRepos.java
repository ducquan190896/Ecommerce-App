package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.OrderItem;

@Repository
public interface OrderItemRepos extends JpaRepository<OrderItem, Long> {
    
}
