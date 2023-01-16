package amazon.app.backend.Entity.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ChangePassword {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;
}
