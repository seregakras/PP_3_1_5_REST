package ru.kata.spring.boot_security.demo.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class UserMapper extends GenericMapper<User, UserDTO> {

    private final RoleService roleService;

    protected UserMapper(ModelMapper modelMapper, RoleService roleService) {
        super(User.class, UserDTO.class, modelMapper);
        this.roleService = roleService;
    }

    @PostConstruct
    protected void setupMapper() {
        modelMapper.createTypeMap(User.class, UserDTO.class)
                .addMappings(m -> m.skip(UserDTO::setRoleNames))
                .setPostConverter(toDTOConverter());

        modelMapper.createTypeMap(UserDTO.class, User.class)
                .addMappings(m -> m.skip(User::setRoles))
                .setPostConverter(toEntityConverter());
    }

    @Override
    protected void mapSpecificFields(UserDTO source, User destination) {
        if (!Objects.isNull(source.getRoleNames())) {
            destination.setRoles(roleService.findAllByTitles(source.getRoleNames()));
        } else {
            destination.setRoles(Collections.emptyList());
        }
    }

    @Override
    protected void mapSpecificFields(User source, UserDTO destination) {
        destination.setRoleNames(getNames(source));
    }

    private List<String> getNames(User source) {
        return Objects.isNull(source) || Objects.isNull(source.getRoles()) ?
                Collections.emptyList() :
                source.getRoles()
                        .stream()
                        .map(Role::getTitle)
                        .collect(Collectors.toList());
    }
}
