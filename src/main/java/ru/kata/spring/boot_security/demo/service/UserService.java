package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService extends GenericService<User> {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, RoleService roleService, BCryptPasswordEncoder passwordEncoder) {
        super(repository);
        this.userRepository = repository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void create(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @PostConstruct
    public void createRoleUser() {
        if (roleService.findByTitle("ADMIN") == null) {
            roleService.create(new Role("ADMIN", null));
        }
        if (roleService.findByTitle("USER") == null) {
            roleService.create(new Role("USER", null));
        }
        if (userRepository.findUserByName("admin") == null) {
            List<Role> rolesAdmin = new ArrayList<>(Arrays.asList(roleService.findByTitle("ADMIN"),
                                                    roleService.findByTitle("USER")));
            userRepository.save(new User("admin",
                    "admin",
                    43,
                    "admin@admin.com",
                    "$2a$10$IRAa2L42Bz011.za0K6QrevQX2cGHIsbfouKkGdP9OU6S6klTsJn6",
                    rolesAdmin));
        }
    }
}
