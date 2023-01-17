package amazon.app.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Orders;
import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.StatusOrder;
import amazon.app.backend.Entity.Users;

@Repository
public interface OrderRepos extends JpaRepository<Orders, Long> {
  
    List<Orders> findByStatus(StatusOrder status);
    List<Orders> findByUser(Users user);
}
