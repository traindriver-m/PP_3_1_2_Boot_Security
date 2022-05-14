package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService service;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserService service, RoleRepository roleRepository) {
        this.service = service;
        this.roleRepository = roleRepository;
    }

    @GetMapping("")
    public String findAll(@AuthenticationPrincipal User user, Model model) {
        List<User> users = service.findAll();
        model.addAttribute("users" , users);
        model.addAttribute("roleset" , roleRepository.findAll());
        model.addAttribute("useradd" , new User());
        model.addAttribute("user" , user);
        return "admin-panel";
    }

    @PostMapping("/add")
    public String createUser(User user) {
        Role role = new Role();
        service.add(user);
        return "redirect:/admin";
    }

    @PostMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id, User user) {
        service.delete(id);
        return "redirect:/admin";
    }

    @PostMapping("/edit/{id}")
    public String updateUserForm(@PathVariable("id") Long id, User user) {
        service.add(user);
        return "redirect:/admin";
    }
}
