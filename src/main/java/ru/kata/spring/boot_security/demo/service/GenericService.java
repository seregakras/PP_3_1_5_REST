package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import ru.kata.spring.boot_security.demo.model.GenericModel;
import ru.kata.spring.boot_security.demo.repositories.GenericRepository;

import java.util.List;

@Service
public abstract class GenericService<T extends GenericModel> {
    private final GenericRepository<T> repository;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    public GenericService(GenericRepository<T> repository) {
        this.repository = repository;
    }

    public List<T> getAll() {
        return repository.findAll();
    }

    public T create(T entity) {
        return repository.save(entity);
    }

    public T update(T entity) {
        return repository.save(entity);
    }

    public T findById(long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Пользователь с таким id: " + id + " - не найден"));
    }

    public void delete(long id) {
        T entity = findById(id);
        repository.delete(entity);
    }
}
