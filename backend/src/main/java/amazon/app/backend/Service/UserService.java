package amazon.app.backend.Service;

import java.util.List;

import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Request.ChangePassword;
import amazon.app.backend.Entity.Request.UserSignup;
import amazon.app.backend.Entity.Response.UserResponse;

public interface UserService {
    UserResponse saveUser(UserSignup userSignup);
    List<UserResponse> getListUsers();
    UserResponse getUserById(Long id);
    UserResponse getUserByUsername(String username);
    UserResponse getUserByEmail(String email);
    UserResponse updatePassword(ChangePassword changePassword);
    void deleteUsers(Long id);
    Users test();
    UserResponse updateToAdmin(Long userId);
    
}
