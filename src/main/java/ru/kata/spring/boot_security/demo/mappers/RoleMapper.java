package ru.kata.spring.boot_security.demo.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dto.RoleDTO;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.GenericModel;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class RoleMapper extends GenericMapper<Role, RoleDTO> {

    private final UserRepository userRepository;

    protected RoleMapper(ModelMapper modelMapper, UserRepository userRepository) {
        super(Role.class, RoleDTO.class, modelMapper);
        this.userRepository = userRepository;
    }

    @PostConstruct
    protected void setupMapper() {
        modelMapper.createTypeMap(Role.class, RoleDTO.class)
                .addMappings(m -> m.skip(RoleDTO::setUserIds))
                .setPostConverter(toDTOConverter());

        modelMapper.createTypeMap(RoleDTO.class, Role.class)
                .addMappings(m -> m.skip(Role::setUsers))
                .setPostConverter(toEntityConverter());
    }

    @Override
    protected void mapSpecificFields(RoleDTO source, Role destination) {
        if(!Objects.isNull(source.getUserIds())) {
            destination.setUsers(userRepository.findAllById(source.getUserIds()));
        }
        else {
            destination.setUsers(Collections.emptyList());
        }
    }

    @Override
    protected void mapSpecificFields(Role source, RoleDTO destination) {
        destination.setUserIds(getIds(source));
    }

    private List<Long> getIds(Role source) {
        return Objects.isNull(source) || Objects.isNull(source.getUsers())?
                Collections.emptyList() :
                source.getUsers()
                        .stream()
                        .map(GenericModel::getId)
                        .collect(Collectors.toList());
    }
}
