package amazon.app.backend.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.City;
import amazon.app.backend.Entity.Request.CityRequest;
import amazon.app.backend.Service.CityService;

@RestController
@RequestMapping("/api/cities")
public class CityController {
    @Autowired
    CityService cityService;

    @GetMapping("/all")
    public ResponseEntity<List<City>> getAll() {
        return new ResponseEntity<List<City>>(cityService.getCities(), HttpStatus.OK);
    }
    @GetMapping("/countryName/{countryName}")
    public ResponseEntity<List<City>> getAllByCountry(@PathVariable String countryName) {
        return new ResponseEntity<List<City>>(cityService.getCitiesByCountry(countryName), HttpStatus.OK);
    }
    @GetMapping("/countryId/{countryId}")
    public ResponseEntity<List<City>> getAllByCountryId(@PathVariable Long countryId) {
        return new ResponseEntity<List<City>>(cityService.getCitiesByCountryId(countryId), HttpStatus.OK);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<City> getByCityName(@PathVariable String name) {
        return new ResponseEntity<City>(cityService.getBycityName(name), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<City> getByCityId(@PathVariable Long id) {
        return new ResponseEntity<City>(cityService.getById(id), HttpStatus.OK);
    }
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteByCityId(@PathVariable Long id) {
        cityService.deleteCity(id);
        return new ResponseEntity<HttpStatus>( HttpStatus.NO_CONTENT);
    }
    @PutMapping("/id/{id}/name/{name}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @PathVariable String name) {
        return new ResponseEntity<City>(cityService.updateCity(id, name), HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<City> addCity(@Valid @RequestBody CityRequest cityRequest) {
        return new ResponseEntity<City>(cityService.saveCity(cityRequest), HttpStatus.CREATED);
    }
}
