package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Address;

@Repository
public interface AddressRepos extends JpaRepository<Address, Long> {
    
}
