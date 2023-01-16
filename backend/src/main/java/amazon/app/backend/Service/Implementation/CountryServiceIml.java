package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Country;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CountryRepos;
import amazon.app.backend.Service.CountryService;

@Service
public class CountryServiceIml implements CountryService {
    @Autowired
    CountryRepos countryRepos;

    @Override
    public void deleteCountry(Long id) {
        Optional<Country> entity = countryRepos.findById(id);
        Country country  = ischeck(entity);
        countryRepos.delete(country);
    }

    @Override
    public List<Country> getCountries() {
       return countryRepos.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public Country getCountry(Long id) {
        Optional<Country> entity = countryRepos.findById(id);
        Country country  = ischeck(entity);
        return country;
    }

    @Override
    public Country getCountryByName(String name) {
       Optional<Country> entityName = countryRepos.findByName(name);
       Country country = ischeck(entityName);
       return country;
    }

    @Override
    public Country saveCountry(Country country) {
        Optional<Country> entityName = countryRepos.findByName(country.getName());
        if(entityName.isPresent()) {
           throw new EntityExistingException("the country with name " + country.getName() + " exist, dublicate error"); 
        }
        return countryRepos.save(country);
    }

    @Override
    public Country updateCountry(Long id, String name) {
        Optional<Country> entity = countryRepos.findById(id);
        Country country  = ischeck(entity);
        Optional<Country> entityName = countryRepos.findByName(name);
        if(entityName.isPresent()) {
           throw new EntityExistingException("the country with name " + name + " exist, dublicate error"); 
        }
        country.setName(name);
        return countryRepos.save(country);
    }

    private Country ischeck(Optional<Country> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the country not found");
    }
    
}
