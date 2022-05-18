package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AppRestController {

    private final UserService service;
    private final RoleRepository roleRepository;

    @Autowired
    public AppRestController(UserService service, RoleRepository roleRepository) {
        this.service = service;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> create(@RequestBody User user) {
        service.add(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> readAll() {
        List<User> list = service.findAll();
        return list != null && !list.isEmpty()
                ? new ResponseEntity<>(list, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> read(@PathVariable Long id) {
        User user = service.findById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/one/{email}")
    public ResponseEntity<User>get(@PathVariable String email){
        User user = service.findByEmail(email);
        return user !=null ? new ResponseEntity<>(user, HttpStatus.OK):new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all-roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        List<Role> list = roleRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<User> delete(@PathVariable Long id) {
        boolean bool = service.delete(id);
        return bool
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
}
