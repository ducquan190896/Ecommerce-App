package amazon.app.backend.Controller;

import java.util.List;

import javax.validation.Valid;

import org.apache.catalina.connector.Response;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Request.ProductRequest;
import amazon.app.backend.Entity.Response.ProductResponse;
import amazon.app.backend.Service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse>> getAll() {
        return new ResponseEntity<List<ProductResponse>>(productService.getProducts(), HttpStatus.OK);
    }
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getAllByCategory(@PathVariable String category) {
        return new ResponseEntity<List<ProductResponse>>(productService.getProductsByCategory(category), HttpStatus.OK);
    }
    @GetMapping("/brand/{brand}")
    public ResponseEntity<List<ProductResponse>> getAllByBrand(@PathVariable String brand) {
        return new ResponseEntity<List<ProductResponse>>(productService.getProductsByBrand(brand), HttpStatus.OK);
    }
    @GetMapping("/activeDiscount/{isActive}")
    public ResponseEntity<List<ProductResponse>> getAllByDiscountActive(@PathVariable boolean isActive) {
        return new ResponseEntity<List<ProductResponse>>(productService.getProductsByActiveDiscount(isActive), HttpStatus.OK);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<List<ProductResponse>> getAllByNameSearch(@PathVariable String name) {
        return new ResponseEntity<List<ProductResponse>>(productService.getProductsByName(name), HttpStatus.OK);
    }
    @GetMapping("/code/{code}")
    public ResponseEntity<ProductResponse> getAllByProductCode(@PathVariable String code) {
        return new ResponseEntity<ProductResponse>(productService.getProductByCode(code), HttpStatus.OK);
    }
    @GetMapping("/Id/{Id}")
    public ResponseEntity<ProductResponse> getAllByProductId(@PathVariable Long Id) {
        return new ResponseEntity<ProductResponse>(productService.getProductById(Id), HttpStatus.OK);
    }
    @DeleteMapping("/Id/{Id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long Id) {
        productService.deleteProduct(Id);
        return new ResponseEntity<HttpStatus>( HttpStatus.OK);
    }
    @PutMapping("/Id/{Id}")
    public ResponseEntity<ProductResponse> updateProduct(@PathVariable Long Id, @RequestParam(required = false) Integer unitsInStock, @RequestParam(required = false) Boolean active, @RequestParam(required = false) String imageUrl, @RequestParam(required = false) Double price, @RequestParam(required = false) String description, @RequestParam(required = false) String name, @RequestParam(required = false) Double priceDiscounted) {
        return new ResponseEntity<ProductResponse>(productService.updateProduct(Id, unitsInStock, active, imageUrl, price, description, name, priceDiscounted), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ProductResponse> addProduct(@Valid @RequestBody ProductRequest productRequest) {
        return new ResponseEntity<ProductResponse>(productService.saveProduct(productRequest), HttpStatus.OK);
    }

}
