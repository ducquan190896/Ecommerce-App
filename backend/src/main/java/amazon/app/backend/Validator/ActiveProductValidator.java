package amazon.app.backend.Validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import amazon.app.backend.Entity.Product;

public class ActiveProductValidator implements ConstraintValidator<isActiveProduct, Product> {
    @Override
    public void initialize(isActiveProduct constraintAnnotation) {
       
    }
    @Override
    public boolean isValid(Product product, ConstraintValidatorContext context) {
        if(product.getActive() == true && product.getPriceDiscounted() == 0) {
            return false;
        }
       
        
        
        return true;
    }
}
