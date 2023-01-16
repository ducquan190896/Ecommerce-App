package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.City;
import amazon.app.backend.Entity.Request.CityRequest;

public interface CityService {
    List<City> getCities();
    List<City> getCitiesByCountry(String countryName);
    List<City> getCitiesByCountryId(Long countryId);
    City getBycityName(String name);
    City getById(Long id);
    City saveCity(CityRequest cityRequest);
    City updateCity(Long id, String name);
    void deleteCity(Long id);
}
