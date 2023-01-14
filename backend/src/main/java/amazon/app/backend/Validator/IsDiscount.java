package amazon.app.backend.Validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;



@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.ANNOTATION_TYPE, ElementType.TYPE})
@Constraint(validatedBy = {DiscountValidator.class})
@Documented
public @interface IsDiscount {
    
    String message() default "the discounted and normal price are not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
