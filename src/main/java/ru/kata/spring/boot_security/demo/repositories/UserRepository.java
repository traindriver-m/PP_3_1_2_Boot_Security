package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.kata.spring.boot_security.demo.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT user  FROM User user JOIN FETCH user.roles where user.email =:email")
    User findByEmail(String email);
}
