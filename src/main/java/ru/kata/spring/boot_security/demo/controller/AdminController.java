package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.Sex;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("")
    public String viewUsers(Model model, Principal principal) {
        List<User> users = userService.getAll();
        String username = principal.getName();
        List<Role> roles = userService.findByEmail(username).getRoles();
        String roleNames = "";
        for (Role role: roles) {
            roleNames += role.getTitle() + " ";
        }
        model.addAttribute("username", username);
        model.addAttribute("users", users);
        model.addAttribute("roles", roleNames);
        return "allUsers";
    }

    @GetMapping("{id}")
    public String showUser(Model model, @PathVariable Long id) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "showUser";
    }

    @GetMapping("add-user")
    public String addUser(Model model) {
        List<Sex> sexList = List.of(Sex.values());
        model.addAttribute("sexList", sexList);
        return "addUser";
    }

    @PostMapping("add-user")
    public String addUser(@ModelAttribute("user") User user) {
        userService.create(user);
        return "redirect:/admin";
    }

    @GetMapping("update-user/{id}")
    public String updateUser(Model model, @PathVariable long id) {
        List<Sex> sexList = List.of(Sex.values());
        User user = userService.findById(id);
        model.addAttribute("sexList", sexList);
        model.addAttribute("user", user);
        return "updateUser";
    }

    @PostMapping("update-user")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @GetMapping("delete-user/{id}")
    public String deleteUser(@PathVariable long id) {
        userService.delete(id);
        return "redirect:/admin";
    }

}

