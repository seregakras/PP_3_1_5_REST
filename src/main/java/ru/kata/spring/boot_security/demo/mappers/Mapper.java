package ru.kata.spring.boot_security.demo.mappers;

import ru.kata.spring.boot_security.demo.dto.GenericDTO;
import ru.kata.spring.boot_security.demo.model.GenericModel;

import java.util.List;

public interface Mapper <E extends GenericModel, D extends GenericDTO> {

    E toEntity(D dto);
    D toDTO(E entity);

    List<E> toEntities(List<D> dtos);
    List<D> toDTOs(List<E> entities);
}
