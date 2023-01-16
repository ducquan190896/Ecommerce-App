package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Brand;

public interface BrandService {
    List<Brand> getBrands();
    Brand getBrandByName(String name);
    Brand getBrandById(Long id);
    Brand saveBrand(Brand brand);
    Brand updateBrand(Long id, String brandName);
    void deleteBrand(Long id);
}
