package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Category;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CategoryRepos;
import amazon.app.backend.Service.CategoryService;

@Service
public class CategoryServiceIml implements CategoryService {
    @Autowired
    CategoryRepos categoryRepos;

    @Override
    public void deleteCategory(Long id) {
        Optional<Category> entity = categoryRepos.findById(id);
        Category category = isCheck(entity);
        categoryRepos.delete(category);
        
    }

    @Override
    public Category getById(Long id) {
        Optional<Category> entity = categoryRepos.findById(id);
        Category category = isCheck(entity);
        return category;
    }

    @Override
    public Category getByName(String name) {
        Optional<Category> entity = categoryRepos.findByName(name);
        Category category = isCheck(entity);
        return category;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepos.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        Optional<Category> entity = categoryRepos.findByName(category.getName());
        if(entity.isPresent()) {
            throw new EntityExistingException("the category already exist with name " + category.getName());
        }
        return categoryRepos.save(category);
    }

    @Override
    public Category updateCategory(Long id, String name) {
        Optional<Category> entity = categoryRepos.findById(id);
        Category category = isCheck(entity);

        Optional<Category> entity2 = categoryRepos.findByName(name);
        if(entity2.isPresent()) {
            throw new EntityExistingException("the category already exist with name " + name);
        }
        category.setName(name);
        return categoryRepos.save(category);
    }

    private Category isCheck(Optional<Category> entity) {
        if(entity.isPresent()) {
            return entity.get();
            
        }
        throw new EntityNotFoundException("the category not found");
     }

    
}
