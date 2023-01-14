package amazon.app.backend.Validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class RatingValidator implements ConstraintValidator<RatingSize, Integer>{
    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
       
        if(value == null) {
            return true;
        }
        if(value >= 1 &&  value <= 5) {
            return true;
        }
        return false;
    }
}
