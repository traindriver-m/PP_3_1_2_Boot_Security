package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {
    void add(User user);

    List<User> findAll();

    boolean delete(Long id);

    User findById(Long id);

    User findByEmail(String email);
}
