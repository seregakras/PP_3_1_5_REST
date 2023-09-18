package ru.kata.spring.boot_security.demo.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "roles")
public class Role extends GenericModel {

    @Column(unique = true, nullable = false)
    private String title;

    @ManyToMany
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "role_id"),
            foreignKey = @ForeignKey(name = "FK_ROLES_USERS"),
            inverseJoinColumns = @JoinColumn(name = "user_id"),
            inverseForeignKey = @ForeignKey(name = "FK_USERS_ROLES")
    )
    private List<User> users;
}
