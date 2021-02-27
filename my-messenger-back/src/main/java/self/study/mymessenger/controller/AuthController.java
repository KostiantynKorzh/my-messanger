package self.study.mymessenger.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import self.study.mymessenger.model.dto.UserDTO;
import self.study.mymessenger.model.service.AuthService;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO user) {
        try {
            authService.signupUser(user.getUsername(), user.getPassword());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        try {
            return ResponseEntity.ok(authService.loginUser(user.getUsername(), user.getPassword()));
        } catch (Exception e) {
//            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
