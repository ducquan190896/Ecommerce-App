package amazon.app.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.Country;

@Repository
public interface CountryRepos  extends JpaRepository<Country, Long>{
    Optional<Country> findByName(String name);
}
