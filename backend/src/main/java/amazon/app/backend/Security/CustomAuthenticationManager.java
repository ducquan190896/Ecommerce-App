package amazon.app.backend.Security;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import amazon.app.backend.Entity.Users;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Service.UserService;
import lombok.AllArgsConstructor;

@Component

public class CustomAuthenticationManager implements AuthenticationManager {
    @Autowired
    private    UserRepos userRepos;
   

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        Optional<Users> entity = userRepos.findByUsername(username);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the user not exist");
        }
       
        Users user = entity.get();
        boolean isCheck = new BCryptPasswordEncoder().matches(authentication.getCredentials().toString(), user.getPassword());
        if(isCheck == false) {
            throw new BadCredentialsException("password provided is wrong");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getName()));
        System.out.println(authorities);
        System.out.println("authorities");
        return new UsernamePasswordAuthenticationToken(username, user.getPassword(), authorities);
    }
}
