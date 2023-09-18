package ru.kata.spring.boot_security.demo.repositories;


import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

@Repository
public interface UserRepository extends GenericRepository<User> {

    User findUserByName(String name);
}
