package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
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

    public User findByName(String name) {
        return userRepository.findUserByName(name);
    }

    @Override
    public void create(User user) {
        Role userRole = roleService.findByTitle("USER");
        user.setRoles(List.of(userRole));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @PostConstruct
    public void createRoleUser() {
        if (roleService.findByTitle("USER") == null) {
            roleService.create(new Role("USER", null));
        }
    }
}
