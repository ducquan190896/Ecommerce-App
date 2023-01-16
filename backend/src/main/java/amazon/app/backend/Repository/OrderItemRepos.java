package amazon.app.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Orders;
import amazon.app.backend.Entity.Product;

@Repository
public interface OrderItemRepos extends JpaRepository<OrderItem, Long> {
      List<OrderItem> findByOrder(Orders order);
    List<OrderItem> findByIsOrderedAndCart(boolean isOrdered, Cart cart);
    // List<OrderItem> findByIsOrderedAndProduct(boolean isOrdered, Product product);
    List<OrderItem> findByIsOrdered(boolean isOrdered);
}
