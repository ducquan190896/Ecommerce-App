package amazon.app.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Users;

@Repository
public interface UserRepos extends JpaRepository<Users, Long> {
    
    Optional<Users> findByEmail(String email);
    Optional<Users> findByUsername(String username);
    List<Users> findByUsernameContaining(String username);
}
