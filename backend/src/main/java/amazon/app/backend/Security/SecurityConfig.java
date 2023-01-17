package amazon.app.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import amazon.app.backend.Entity.Role;
import amazon.app.backend.Repository.UserRepos;
import amazon.app.backend.Security.Filter.FilterAuthentication;
import amazon.app.backend.Security.Filter.FilterException;
import amazon.app.backend.Security.Filter.FilterJwtAuthorization;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Autowired
    CustomAuthenticationManager customAuthenticationManager;
    @Autowired
    UserRepos userRepos;
    @Autowired
    FilterException filterException;
    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    LogoutHandler logoutHandler;
    
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        FilterAuthentication filterAuthentication = new FilterAuthentication(customAuthenticationManager, userRepos);
        filterAuthentication.setFilterProcessesUrl("/api/users/login");

        http.csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
        .antMatchers(HttpMethod.POST, "/api/users/register").permitAll()
        .antMatchers(HttpMethod.GET, "/api/cities/**").permitAll()
        .antMatchers(HttpMethod.GET, "/api/countries/**").permitAll()
        .antMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
        .antMatchers("/api/images/**").permitAll()
        .antMatchers( "/api/brands/**").hasRole(Role.ADMIN.name())
        .antMatchers( "/api/categories/**").hasRole(Role.ADMIN.name())      
        .antMatchers("/api/products/**").hasRole(Role.ADMIN.name())
        .antMatchers( "/api/cities/**").hasRole(Role.ADMIN.name())
        .antMatchers( "/api/countries/**").hasRole(Role.ADMIN.name())
        // .antMatchers( "/api/reviews/**").hasRole(Role.ADMIN.name())
        .anyRequest().authenticated()
        .and()
        .authenticationProvider(authenticationProvider())
        .addFilterBefore(filterException, filterAuthentication.getClass())
        .addFilter(filterAuthentication)
        .addFilterAfter(new FilterJwtAuthorization(), filterAuthentication.getClass())
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.logout().permitAll()
        .addLogoutHandler((request, response, auth) -> {
            SecurityContextHolder.clearContext();
            response.setHeader("Authorization", "");
        })
        .logoutSuccessHandler(logoutHandler);

        http.cors();
        return http.build();
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


