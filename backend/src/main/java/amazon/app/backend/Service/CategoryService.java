package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Category;


public interface CategoryService {
    Category getById(Long id);
    Category getByName(String name);
    List<Category> getCategories();
    Category saveCategory(Category category);
    Category updateCategory(Long id, String name);
    void deleteCategory(Long id);
}
