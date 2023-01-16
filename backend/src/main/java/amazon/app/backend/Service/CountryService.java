package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Country;

public interface CountryService {
    List<Country> getCountries();
    Country getCountry(Long id);
    Country getCountryByName(String name);
    Country saveCountry(Country country);
    Country updateCountry(Long id, String name);
    void deleteCountry(Long id);
}
