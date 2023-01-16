package amazon.app.backend.Entity.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSignup {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
}
