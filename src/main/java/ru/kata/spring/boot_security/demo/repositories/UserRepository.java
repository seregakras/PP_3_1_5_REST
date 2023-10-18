package ru.kata.spring.boot_security.demo.repositories;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

@Repository
public interface UserRepository extends GenericRepository<User> {

    @Query(value = "from User u left join fetch u.roles where u.email = :email")
    User findUserByEmail(@Param("email") String email);
}
