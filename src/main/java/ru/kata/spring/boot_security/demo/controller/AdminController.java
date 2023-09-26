package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }


    @GetMapping("")
    public String viewUsers(Model model, Principal principal) {
        List<Role> newRoles = roleService.getAll();
        List<User> users = userService.getAll();
        String username = principal.getName();
        List<Role> roles = userService.findByEmail(username).getRoles();
        StringBuilder roleNames = new StringBuilder();
        for (Role role : roles) {
            roleNames.append(role.getTitle()).append(" ");
        }
        model.addAttribute("username", username);
        model.addAttribute("users", users);
        model.addAttribute("roles", roleNames.toString());
        model.addAttribute("new_roles", newRoles);
        return "allUsers";
    }

    @PostMapping("add-user")
    public String addUser(@ModelAttribute("add-user") User user,
                          @RequestParam("user-roles") List<Long> roleIds,
                          Model model) {
        if (userService.findByEmail(user.getEmail()) != null) {
            model.addAttribute("message", "This email already exists!");
            return "error";
        }
        List<Role> roles = new ArrayList<>();
        for (Long roleId : roleIds) {
            roles.add(roleService.findById(roleId));
        }
        user.setRoles(roles);
        userService.create(user);
        return "redirect:/admin";
    }

    @PostMapping("update-user")
    public String updateUser(@ModelAttribute("edit-user") User user,
                             @RequestParam("user-roles") List<Long> roleIds) {
        List<Role> roles = new ArrayList<>();
        for (Long roleId : roleIds) {
            roles.add(roleService.findById(roleId));
        }
        user.setRoles(roles);
        userService.update(user);
        return "redirect:/admin";
    }

    @PostMapping("delete-user")
    public String deleteUser(@ModelAttribute("delete-user") User user) {
        userService.delete(user.getId());
        return "redirect:/admin";
    }

}

