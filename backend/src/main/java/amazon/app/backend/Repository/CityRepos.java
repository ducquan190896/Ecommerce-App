package amazon.app.backend.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import amazon.app.backend.Entity.City;
import amazon.app.backend.Entity.Country;

@Repository
public interface CityRepos extends JpaRepository<City, Long> {
    Optional<City> findByName(String name);
    List<City> findByCountry(Country country);
}
