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

import amazon.app.backend.Entity.Brand;
import amazon.app.backend.Service.BrandService;

@RestController
@RequestMapping("/api/brands")
public class BrandController {
    @Autowired
    BrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<List<Brand>> getAll() {
        return new ResponseEntity<List<Brand>>(brandService.getBrands(), HttpStatus.OK);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Brand> getById(@PathVariable Long id) {
        return new ResponseEntity<Brand>(brandService.getBrandById(id), HttpStatus.OK);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<Brand> getByName(@PathVariable String name) {
        return new ResponseEntity<Brand>(brandService.getBrandByName(name), HttpStatus.OK);
    }
    @PutMapping("/id/{id}/name/{name}")
    public ResponseEntity<Brand> updateBrandByName(@PathVariable Long id, @PathVariable String name) {
        return new ResponseEntity<Brand>(brandService.updateBrand(id, name), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Brand> addBrand(@Valid @RequestBody Brand brand) {
        return new ResponseEntity<Brand>(brandService.saveBrand(brand), HttpStatus.OK);
    }

    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long id) {
        brandService.deleteBrand(id); 
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }
}
