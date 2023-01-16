package amazon.app.backend.Validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import amazon.app.backend.Entity.Product;

public class DiscountValidator implements ConstraintValidator<IsDiscount, Product>  {
    @Override
    public void initialize(IsDiscount constraintAnnotation) {
        
    }

    @Override
    public boolean isValid(Product product, ConstraintValidatorContext context) {
        // if(product == null) {
        //     return true;
        // }
        return product.getPrice() >= product.getPriceDiscounted() ? true: false;
    }
}
