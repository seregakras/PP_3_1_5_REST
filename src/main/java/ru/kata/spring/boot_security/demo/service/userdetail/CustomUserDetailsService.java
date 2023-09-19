package ru.kata.spring.boot_security.demo.service.userdetail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Value("${spring.security.user.name}")
    private String adminUserName;
    @Value("${spring.security.user.password}")
    private String adminPassword;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (username.equals(adminUserName)) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
            return new CustomUserDetails(
                    null,
                    adminUserName,
                    adminPassword,
                    authorities);
        }
        User user = userRepository.findUserByName(username);
        List<SimpleGrantedAuthority> roles = user.getRoles().stream()
                .map(x -> new SimpleGrantedAuthority("ROLE_" + x.getTitle()))
                .collect(Collectors.toList());
        authorities.addAll(roles);
        return new CustomUserDetails(
                user.getId().intValue(),
                user.getName(),
                user.getPassword(),
                authorities);
    }
}
