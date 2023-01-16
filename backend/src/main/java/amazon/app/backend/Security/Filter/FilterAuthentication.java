package amazon.app.backend.Security.Filter;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import amazon.app.backend.Entity.Users;
import amazon.app.backend.Entity.Response.UserResponse;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Security.CustomAuthenticationManager;
import amazon.app.backend.Security.SecurityConstant;
import amazon.app.backend.Service.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class FilterAuthentication extends UsernamePasswordAuthenticationFilter {

    @Autowired
    CustomAuthenticationManager customAuthenticationManager;
    @Autowired
    UserRepos userRepos;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
       try {
        Users user = new ObjectMapper().readValue(request.getInputStream(), Users.class);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());

        return customAuthenticationManager.authenticate(authentication);

       } catch (IOException ex) {
        throw new RuntimeException(ex.getMessage());
       }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
       response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
       response.getWriter().write("your password is wrong");
       response.getWriter().flush();
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        List<String> claims = authResult.getAuthorities().stream().map(au -> au.getAuthority()).collect(Collectors.toList());
        System.out.println(claims);
       String token = JWT.create()
       .withClaim("authorities", claims)
       .withSubject(authResult.getName())
       .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstant.expire_time))
       .sign(Algorithm.HMAC512(SecurityConstant.private_key));
        
       response.setHeader("Authorization", SecurityConstant.authorization + token);
       response.setStatus(HttpServletResponse.SC_OK); 
    
       Users user = userRepos.findByUsername(authResult.getName()).get();
       UserResponse userResponse = new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole().name());
       Gson gson = new Gson();
       
       response.getWriter().print(gson.toJson(userResponse));
       response.getWriter().flush();

    }

   
    
}
