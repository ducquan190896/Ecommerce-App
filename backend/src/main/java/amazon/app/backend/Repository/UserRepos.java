package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Users;

@Repository
public interface UserRepos extends JpaRepository<Users, Long> {
    
}
