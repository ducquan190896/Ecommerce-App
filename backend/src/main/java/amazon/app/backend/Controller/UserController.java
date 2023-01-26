package amazon.app.backend.Controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Request.ChangePassword;
import amazon.app.backend.Entity.Request.UserSignup;
import amazon.app.backend.Entity.Response.UserResponse;
import amazon.app.backend.Service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAll() {
        return new ResponseEntity<>(userService.getListUsers(), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/searchName/{username}")
    public ResponseEntity<List<UserResponse>> getAllByUsername(@PathVariable String username) {
        return new ResponseEntity<List<UserResponse>>(userService.getListUsersByName(username), HttpStatus.OK);
    }
    @GetMapping("/test")
    public ResponseEntity<Users> test() {
        return new ResponseEntity<>(userService.test(), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponse> getByUsername(@PathVariable String username) {
        return new ResponseEntity<>(userService.getUserByUsername(username), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponse> getByEmail(@PathVariable String email) {
        return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/id/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserSignup userSignup) {
        return new ResponseEntity<>(userService.saveUser(userSignup), HttpStatus.CREATED);
    }
    @PutMapping("/changepassword")
    public ResponseEntity<UserResponse> updatePassword(@Valid @RequestBody ChangePassword changePassword) {
        return new ResponseEntity<>(userService.updatePassword(changePassword), HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/id/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        userService.deleteUsers(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/updateToAdmin/{userId}")
    public ResponseEntity<UserResponse> updatePassword(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.updateToAdmin(userId), HttpStatus.OK);
    }
}
