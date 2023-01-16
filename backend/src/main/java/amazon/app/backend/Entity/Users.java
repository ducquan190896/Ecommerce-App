package amazon.app.backend.Entity;


import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = {"email", "username"})})
@Entity(name = "users")
public class Users {
    @Id
    @SequenceGenerator(
        name = "users_sequence",
        sequenceName = "users_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "users_sequence"
    )
    @Column(name = "id", updatable = false)
    private Long id;

    @Email
    @NotBlank(message = "email name cannot be blank")
    @Column(name = "email", nullable = false)
    private String email;

    @NotBlank(message = "user name cannot be blank")
    @Column(name = "username", nullable = false)
    private String username;

    @NotBlank(message = "password cannot be blank")
    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Orders> orderList = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Review> reviews = new HashSet<>();

    public Users(String email, String username, String password, Role role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Users( String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    

    @Override
    public int hashCode() {
       return Objects.hash(this.id, this.username, this.email, this.password, this.role);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Users user = (Users) obj;
        
        return Objects.equals(this.id, user.getId()) && Objects.equals(this.username, user.getUsername()) && Objects.equals(this.email, user.getEmail()) && Objects.equals(this.password, user.getPassword());
    }

    @Override
    public String toString() {
        return "Users [id=" + id + ", email=" + email + ", username=" + username + ", password=" + password + ", role="
                + role + "]";
    }

    
}
