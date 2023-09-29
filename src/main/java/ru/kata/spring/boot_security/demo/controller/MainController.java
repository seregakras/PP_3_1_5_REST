package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.webjars.NotFoundException;

@Controller
@RequestMapping("/")
public class MainController {

    @GetMapping("")
    public String index() {
        return "login";
    }

    @GetMapping("accessDenied")
    public String accessDenied() {
        return "accessIsDenied";
    }

    @ExceptionHandler(NotFoundException.class)
    public String handleException(Model model, NotFoundException e) {
        model.addAttribute("message", e.getMessage());
        return "error";
    }
}
