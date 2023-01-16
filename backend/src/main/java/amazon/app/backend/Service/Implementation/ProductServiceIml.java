package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Brand;
import amazon.app.backend.Entity.Category;
import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Request.ProductRequest;
import amazon.app.backend.Entity.Response.ProductResponse;
import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.BrandRepos;
import amazon.app.backend.Repository.CategoryRepos;
import amazon.app.backend.Repository.ProductRepos;
import amazon.app.backend.Service.ProductService;

@Service
public class ProductServiceIml implements ProductService{

    @Autowired
    ProductRepos productRepos;
    @Autowired
    BrandRepos brandRepos;
    @Autowired
    CategoryRepos categoryRepos;

    @Override
    public void deleteProduct(Long id) {
        Optional<Product> entity = productRepos.findById(id);
        Product product = isCheck(entity);
        productRepos.delete(product);
    }

    @Override
    public ProductResponse getProductByCode(String productCode) {
        Optional<Product> entity = productRepos.findByProductCode(productCode);
        Product product = isCheck(entity);
        ProductResponse response = checkImage(product);
        return response;
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Optional<Product> entity = productRepos.findById(id);
        Product product = isCheck(entity);
        ProductResponse response = checkImage(product);
        return response;
    }

    @Override
    public List<ProductResponse> getProducts() {
        
        List<Product> list = productRepos.findAll(Sort.by(Sort.Direction.ASC, "name"));

        List<ProductResponse> responses = convertToProductResponse(list);
        return responses;
    }

    @Override
    public List<ProductResponse> getProductsByActiveDiscount(boolean active) {
        List<Product> list = productRepos.findByActive(active);
        list.sort((p1, p2) -> p1.getName().compareTo(p2.getName()));

        List<ProductResponse> responses = convertToProductResponse(list);
        return responses;
    }

    @Override
    public List<ProductResponse> getProductsByBrand(String brandName) {
        Optional<Brand> entity = brandRepos.findByName(brandName);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the category not found");
        }
        Brand brand= entity.get();
        List<Product> list = productRepos.findByBrand(brand);
        list.sort((p1, p2) -> p1.getName().compareTo(p2.getName()));

        List<ProductResponse> responses = convertToProductResponse(list);
        return responses;
    }

    @Override
    public List<ProductResponse> getProductsByCategory(String categoryName) {
        Optional<Category> entity = categoryRepos.findByName(categoryName);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the category not found");
        }
        Category category = entity.get();
        List<Product> list = productRepos.findByCategory(category);
        list.sort((p1, p2) -> p1.getName().compareTo(p2.getName()));

        List<ProductResponse> responses = convertToProductResponse(list);
        return responses;
    }

    @Override
    public List<ProductResponse> getProductsByName(String name) {
        List<Product> list = productRepos.findByNameContaining(name);
        list.sort((p1, p2) -> p1.getName().compareTo(p2.getName()));

        List<ProductResponse> responses = convertToProductResponse(list);
        return responses;
    }

    @Override
    public ProductResponse saveProduct(ProductRequest productRequest) {
        
        Optional<Product> entityName = productRepos.findByName(productRequest.getName());
        if(entityName.isPresent()) {
            throw new EntityExistingException("the product already exists with the name "+ productRequest.getName());
        }
        String productCode = UUID.randomUUID().toString();

        Optional<Brand> entityBrand = brandRepos.findByName(productRequest.getBrandName());
        if(!entityBrand.isPresent()) {
            throw new EntityNotFoundException("the category not found");
        }
        Brand brand= entityBrand.get();

         Optional<Category> entityCategory = categoryRepos.findByName(productRequest.getCategoryName());
        if(!entityCategory.isPresent()) {
            throw new EntityNotFoundException("the category not found");
        }
        Category category = entityCategory.get();

        Product product = new Product(productRequest.getName(), productRequest.getDescription(), productRequest.getPrice(), productRequest.getUnitsInStock(), brand, productCode, category);
        if(productRequest.getImageUrl() != null ) {
            product.setImageUrl(productRequest.getImageUrl());
        }
        productRepos.save(product);
        ProductResponse response = checkImage(product);
        return response;
    }

    @Override
    public ProductResponse updateProduct(Long id, Integer unitsInStock, Boolean active, String imageUrl, Double price, String description, String name, Double priceDiscounted) {
             Optional<Product> entity = productRepos.findById(id);
                Product product = isCheck(entity);
                if(unitsInStock != null) {
                    product.setUnitsInStock(unitsInStock);
                }
                if(active != null) {
                    product.setActive(active);
                }
                if(imageUrl != null) {
                    product.setImageUrl(imageUrl);
                }
                if(price != null) {
                    product.setPrice(price);
                }
                if(description != null) {
                    product.setDescription(description);
                }
                if(name != null) {
                    Optional<Product> entityName = productRepos.findByName(name);
                    if(entityName.isPresent()) {
                        throw new EntityExistingException("the product already exists with the name "+ name);
                    }
                   
                    product.setName(name);
                }
                if(priceDiscounted != null) {
                    if(priceDiscounted > product.getPrice()) {
                        throw new BadResultException("the discount price must be less than the price of product");
                    }
                    product.setPriceDiscounted(priceDiscounted);
                    product.setActive(true);
                }
                productRepos.save(product);
               ProductResponse response = checkImage(product);
               return response;
    }

    private List<ProductResponse> convertToProductResponse(List<Product> products) {
        List<ProductResponse> responsese = products.stream().map(p -> {
            ProductResponse response = null;
            if(p.getImageUrl() != null) {
                response = new ProductResponse(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getImageUrl(), p.getUnitsInStock(), p.getBrand().getName(), p.getProductCode(), p.getCategory().getName(), p.getActive(), p.getPriceDiscounted());
                
            } else {
                response = new ProductResponse(p.getId(), p.getName(), p.getDescription(), p.getPrice(), p.getUnitsInStock(), p.getBrand().getName(), p.getProductCode(), p.getCategory().getName(), p.getActive(),  p.getPriceDiscounted());
            }
            return response;
           
        }).collect(Collectors.toList());

        return responsese;
    }
    private Product isCheck(Optional<Product> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the product not found");
    }

    private ProductResponse checkImage(Product product) {
        if(product.getImageUrl() != null) {
            return new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImageUrl(), product.getUnitsInStock(), product.getBrand().getName(), product.getProductCode(), product.getCategory().getName(), product.getActive(),  product.getPriceDiscounted());
        }
        return new ProductResponse(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getUnitsInStock(), product.getBrand().getName(), product.getProductCode(), product.getCategory().getName(), product.getActive(),  product.getPriceDiscounted());
    }
}
