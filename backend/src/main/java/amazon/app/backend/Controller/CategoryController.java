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

import amazon.app.backend.Entity.Category;
import amazon.app.backend.Service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/id/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        return new ResponseEntity<Category>(categoryService.getById(id), HttpStatus.OK);
    }
    @GetMapping("/name/{name}")
    public ResponseEntity<Category> getByName(@PathVariable String name) {
        return new ResponseEntity<Category>(categoryService.getByName(name), HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAll() {
        return new ResponseEntity<List<Category>>(categoryService.getCategories(), HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@Valid @RequestBody Category category) {
        return new ResponseEntity<Category>(categoryService.saveCategory(category), HttpStatus.CREATED);
    }
    @PutMapping("/id/{id}/name/{name}")
    public ResponseEntity<Category> updateCategory( @PathVariable Long id, @PathVariable String name) {
        return new ResponseEntity<Category>(categoryService.updateCategory(id, name), HttpStatus.OK);
    }
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity<HttpStatus>( HttpStatus.OK);
    }
}
