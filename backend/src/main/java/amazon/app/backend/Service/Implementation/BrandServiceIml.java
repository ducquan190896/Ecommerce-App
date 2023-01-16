package amazon.app.backend.Service.Implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Brand;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.BrandRepos;
import amazon.app.backend.Service.BrandService;

@Service
public class BrandServiceIml implements BrandService{
    @Autowired
    BrandRepos brandRepos;

    @Override
    public void deleteBrand(Long id) {
        Optional<Brand> entity = brandRepos.findById(id);
        Brand brand = isCheck(entity);
        brandRepos.delete(brand);
    }

    @Override
    public Brand getBrandById(Long id) {
       Optional<Brand> entity = brandRepos.findById(id);
       Brand brand = isCheck(entity);
       return brand;
    }

    @Override
    public Brand getBrandByName(String name) {
        Optional<Brand> entity = brandRepos.findByName(name);
       Brand brand = isCheck(entity);
       return brand;
    }

    @Override
    public List<Brand> getBrands() {
       
        return brandRepos.findAll();
    }

    @Override
    public Brand saveBrand(Brand brand) {
        Optional<Brand> entity = brandRepos.findByName(brand.getName());
        if(entity.isPresent()) {
            throw new EntityExistingException("the brand with name " + brand.getName() + " exist");
        }
    return  brandRepos.save(brand);
    }

    @Override
    public Brand updateBrand(Long id, String brandName) {
        Optional<Brand> entity = brandRepos.findById(id);
        Brand brand = isCheck(entity);

        Optional<Brand> entity2 = brandRepos.findByName(brandName);
        if(entity2.isPresent()) {
            throw new EntityExistingException("the brand with name " + brandName + " exist");
        }
        brand.setName(brandName);
        return brandRepos.save(brand);
    }

    private Brand isCheck(Optional<Brand> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the brand is not exist");
    }

    
}
