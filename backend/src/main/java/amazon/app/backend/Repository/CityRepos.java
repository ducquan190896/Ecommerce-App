package amazon.app.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.City;

@Repository
public interface CityRepos extends JpaRepository<City, Long> {
    
}
