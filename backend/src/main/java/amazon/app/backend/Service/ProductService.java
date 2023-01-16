package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Request.ProductRequest;
import amazon.app.backend.Entity.Response.ProductResponse;

public interface ProductService {
    List<ProductResponse> getProducts();
    List<ProductResponse> getProductsByCategory(String categoryName);
    List<ProductResponse> getProductsByBrand(String brandName);
    List<ProductResponse> getProductsByActiveDiscount(boolean active);
    List<ProductResponse> getProductsByName(String name);
    ProductResponse getProductByCode(String productCode);
    ProductResponse getProductById(Long id);
    ProductResponse saveProduct(ProductRequest productRequest);
    ProductResponse updateProduct(Long id, Integer unitsInStock, Boolean active, String imageUrl, Double price, String description, String name, Double priceDiscounted);
    void deleteProduct(Long id);
}
