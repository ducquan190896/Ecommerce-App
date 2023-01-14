package amazon.app.backend.Validator;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ActiveProductValidator.class)
@Documented
public @interface isActiveProduct {
    String message() default "the active status of product is not valid";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
