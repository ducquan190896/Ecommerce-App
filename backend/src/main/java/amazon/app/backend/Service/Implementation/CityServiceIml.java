package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.City;
import amazon.app.backend.Entity.Country;
import amazon.app.backend.Entity.Request.CityRequest;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CityRepos;
import amazon.app.backend.Repository.CountryRepos;
import amazon.app.backend.Service.CityService;
import amazon.app.backend.Service.CountryService;

@Service
public class CityServiceIml implements CityService{
    @Autowired
    CityRepos cityRepos;
    @Autowired
    CountryService countryService;
    @Autowired 
    CountryRepos countryRepos;

    @Override
    public void deleteCity(Long id) {
        Optional<City> entity = cityRepos.findById(id);
        City city = isCheck(entity);
        Country country = city.getCountry();
        country.getCities().remove(city);
        cityRepos.delete(city);
        countryRepos.save(country);
    }

    @Override
    public City getById(Long id) {
        Optional<City> entity = cityRepos.findById(id);
       City city = isCheck(entity);
       return city;
    }

    @Override
    public City getBycityName(String name) {
       Optional<City> entity = cityRepos.findByName(name);
       City city = isCheck(entity);
       return city;
    }

    @Override
    public List<City> getCities() {
        return cityRepos.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @Override
    public List<City> getCitiesByCountry(String countryName) {
        Country country = countryService.getCountryByName(countryName);

        List<City> list = cityRepos.findByCountry(country);
        list.sort((a, b) -> a.getName().compareTo(b.getName()));
        return list;
    }

    @Override
    public List<City> getCitiesByCountryId(Long countryId) {
        Country country = countryService.getCountry(countryId);

        List<City> list = cityRepos.findByCountry(country);
        list.sort((a, b) -> a.getName().compareTo(b.getName()));
        return list;
    }

    @Override
    public City saveCity(CityRequest cityRequest) {
        Optional<City> entityName = cityRepos.findByName(cityRequest.getName());
        if(entityName.isPresent()) {
            throw new EntityExistingException("the city exist, cannot add due to duplication error");
        }
        Country country = countryService.getCountry(cityRequest.getCountryId());
        City city = new City(cityRequest.getName(), country);
        cityRepos.save(city);
        country.getCities().add(city);
        countryRepos.save(country);
        return city;
    }

    @Override
    public City updateCity(Long id, String name) {
        Optional<City> entity = cityRepos.findById(id);
        City city = isCheck(entity);
        Optional<City> entityName = cityRepos.findByName(name);
        if(entityName.isPresent()) {
            throw new EntityExistingException("the city exist, cannot add due to duplication error");
        }
        city.setName(name);
        return cityRepos.save(city);
    }
    
    private City isCheck(Optional<City> entity) {
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the city not found");
        }
        return   entity.get();

    }
}
