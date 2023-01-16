package amazon.app.backend.Service.Implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.Role;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Request.ChangePassword;
import amazon.app.backend.Entity.Request.UserSignup;
import amazon.app.backend.Entity.Response.UserResponse;
import amazon.app.backend.Exception.BadResultException;
import amazon.app.backend.Exception.EntityExistingException;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.CartRepos;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Service.UserService;

@Service
public class UserServiceIml implements UserService, UserDetailsService {
    @Autowired
    UserRepos userRepos;
    @Autowired
    CartRepos cartRepos;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> entity = userRepos.findByUsername(username);
        Users user = isCheck(entity);
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        User userdetail = new User(username, user.getPassword(), authorities);
        return userdetail;
    }
    @Override
    public UserResponse saveUser(UserSignup userSignup) {
        if(!userSignup.getPassword().equals(userSignup.getConfirmPassword())) {
            throw new BadResultException("the passwords don't match");
        }
        Optional<Users> userEntity = userRepos.findByUsername(userSignup.getUsername());
        if(userEntity.isPresent()) {
            throw new EntityExistingException("the user with username " + userSignup.getUsername() + " is exist");
        }
        Optional<Users> userEntity2 = userRepos.findByEmail(userSignup.getEmail());
        if(userEntity2.isPresent()) {
            throw new EntityExistingException("the user with email " + userSignup.getEmail() + " is exist");
        }
       Users user = new Users(userSignup.getEmail(), userSignup.getUsername(), new BCryptPasswordEncoder().encode(userSignup.getPassword()), Role.USER);
       Cart cart = new Cart(user);
        user.setCart(cart);
       userRepos.save(user);
      
       UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
       return userResponse;

    }
    @Override
    public List<UserResponse> getListUsers() {
        // Boolean isAdmin = isCheckAdmin();
        // if(isAdmin == false) {
        //     throw new BadResultException("the role of user is not authorized to get all users");
        // }
       return userRepos.findAll().stream().map(user -> new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name())).collect(Collectors.toList());
    }
    @Override
    public void deleteUsers(Long id) {
     
        // Boolean isAdmin = isCheckAdmin();
        // if(isAdmin == false) {
        //     throw new BadResultException("the role of user is not authorized to delete");
        // }
        Optional<Users> entity =  userRepos.findById(id);
        Users user = isCheck(entity);
        userRepos.delete(user);
    }
    @Override
    public UserResponse getUserByEmail(String email) {
        Optional<Users> entity = userRepos.findByEmail(email);
        Users user = isCheck(entity);
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
        return userResponse;
    }
    @Override
    public UserResponse getUserById(Long id) {
        Optional<Users> entity =  userRepos.findById(id);
        Users user = isCheck(entity);
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
       return userResponse;
    }
    @Override
    public UserResponse getUserByUsername(String username) {
        Optional<Users> entity = userRepos.findByUsername(username);
        Users user = isCheck(entity);
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
        return userResponse;
    }
    @Override
    public UserResponse updatePassword(ChangePassword changePassword) {
     
       Users user = getAuthUser();

       if((new BCryptPasswordEncoder().matches(changePassword.getCurrentPassword(), user.getPassword())) == false) {
        throw new BadResultException(" current password is wrong");
       }
       if(!changePassword.getNewPassword().equals(changePassword.getConfirmPassword())) {
        throw new BadResultException("the newpasswords dont't match");
       }

       user.setPassword(new BCryptPasswordEncoder().encode(changePassword.getNewPassword()));
        userRepos.save(user);
        UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
        return userResponse;
    }

    private Users isCheck(Optional<Users> entity) {
        if(entity.isPresent()) {
            return entity.get();
        }
        throw new EntityNotFoundException("the user not exist");
    }
    @Override
    public Users test() {
        Optional<Users> entity = userRepos.findByUsername("quan");
        Users user = isCheck(entity);
        return user;
    }

    private Boolean isCheckAdmin() {
        
        Users user = getAuthUser();
        if(!user.getRole().equals(Role.ADMIN)) {
           return false;
        }
        return true;
     }
    private Users getAuthUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        Users user = isCheck(entity);
        return user;
    }
    @Override
    public UserResponse updateToAdmin(Long userId) {
       Optional<Users> entity = userRepos.findById(userId);
       Users user = isCheck(entity);
       user.setRole(Role.ADMIN);
       userRepos.save(user);
       UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
       return userResponse;
    }
}
