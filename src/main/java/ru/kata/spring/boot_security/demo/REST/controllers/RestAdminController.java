package ru.kata.spring.boot_security.demo.REST.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.exception_handling.UserIncorrectData;
import ru.kata.spring.boot_security.demo.mappers.UserMapper;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/rest/admin")
public class RestAdminController {

    private final UserService userService;
    private final UserMapper userMapper;

    public RestAdminController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @RequestMapping(method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserDTO>> allUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.toDTOs(userService.getAll()));
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> getOne(@PathVariable(value = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userMapper.toDTO(userService.findById(id)));
    }

    @RequestMapping(method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO newUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.toDTO(userService.create(userMapper.toEntity(newUser))));
    }

    @RequestMapping(method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO updateUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userMapper.toDTO(userService.create(userMapper.toEntity(updateUser))));
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable(value = "id") Long id) {
        userService.delete(id);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<UserIncorrectData> notFoundException(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserIncorrectData(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<UserIncorrectData> viewException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserIncorrectData(e.getMessage()));
    }
}

