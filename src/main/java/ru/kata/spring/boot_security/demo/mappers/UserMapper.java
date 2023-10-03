package ru.kata.spring.boot_security.demo.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.model.GenericModel;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class UserMapper extends GenericMapper<User, UserDTO> {

    private final RoleRepository roleRepository;

    protected UserMapper(ModelMapper modelMapper, RoleRepository roleRepository) {
        super(User.class, UserDTO.class, modelMapper);
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    protected void setupMapper() {
        modelMapper.createTypeMap(User.class, UserDTO.class)
                .addMappings(m -> m.skip(UserDTO::setRoleIds))
                .setPostConverter(toDTOConverter());

        modelMapper.createTypeMap(UserDTO.class, User.class)
                .addMappings(m -> m.skip(User::setRoles))
                .setPostConverter(toEntityConverter());
    }

    @Override
    protected void mapSpecificFields(UserDTO source, User destination) {
        if(!Objects.isNull(source.getRoleIds())) {
            destination.setRoles(roleRepository.findAllById(source.getRoleIds()));
        }
        else {
            destination.setRoles(Collections.emptyList());
        }
    }

    @Override
    protected void mapSpecificFields(User source, UserDTO destination) {
        destination.setRoleIds(getIds(source));
    }

    private List<Long> getIds(User source) {
        return Objects.isNull(source) || Objects.isNull(source.getRoles())?
                Collections.emptyList() :
                source.getRoles()
                        .stream()
                        .map(GenericModel::getId)
                        .collect(Collectors.toList());
    }
}
