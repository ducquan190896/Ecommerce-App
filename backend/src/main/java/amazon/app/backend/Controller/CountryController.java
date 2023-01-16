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

import amazon.app.backend.Entity.Country;
import amazon.app.backend.Repository.CountryRepos;
import amazon.app.backend.Service.CountryService;

@RestController
@RequestMapping("/api/countries")
public class CountryController {
    @Autowired
    CountryService countryService;

    @GetMapping("/all")
    public ResponseEntity<List<Country>> getAll() {
        return new ResponseEntity<List<Country>>(countryService.getCountries(), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Country> getById(@PathVariable Long id) {
        return new ResponseEntity<Country>(countryService.getCountry(id), HttpStatus.OK);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<Country> getById(@PathVariable String name) {
        return new ResponseEntity<Country>(countryService.getCountryByName(name), HttpStatus.OK);
    }
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long id) {
        countryService.deleteCountry(id);
        return new ResponseEntity<HttpStatus>( HttpStatus.OK);
    }
    @PutMapping("/id/{id}/name/{name}")
    public ResponseEntity<Country> updateByIdAndName(@PathVariable Long id, @PathVariable String name) {
        return new ResponseEntity<Country>(countryService.updateCountry(id, name), HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<Country> AddCountry(@Valid @RequestBody Country country) {
        return new ResponseEntity<Country>(countryService.saveCountry(country), HttpStatus.OK);
    }
}
