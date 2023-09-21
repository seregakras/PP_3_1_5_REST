package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public String showUser(Model model, Principal principal) {
        String username = principal.getName();
        if (username.equals("admin@admin.com")) {
            return "redirect:/login";
        }
        User currentUser = userService.findByEmail(username);
        List<Role> roles = userService.findByEmail(username).getRoles();
        String roleNames = "";
        for (Role role: roles) {
            roleNames += role.getTitle() + " ";
        }
        List<User> users = List.of(currentUser);
        model.addAttribute("username", username);
        model.addAttribute("users", users);
        model.addAttribute("roles", roleNames);
        return "allUsers";
    }
}

