package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService extends GenericService<Role> {
    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        super(repository);
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Role findByTitle(String title) {
        return repository.findByTitle(title);
    }

    @Transactional(readOnly = true)
    public List<Role> findAllByTitles(List<String> titles) {
        List<Role> names = new ArrayList<>();
        for (String title : titles) {
            names.add(repository.findByTitle(title));
        }
        return names;
    }
}
