package self.study.mymessenger.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import self.study.mymessenger.model.dto.UserListDTO;
import self.study.mymessenger.model.service.UserService;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllAvailableReceivers(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.getAllUsers(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
