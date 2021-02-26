package self.study.mymessenger.model.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import self.study.mymessenger.model.dto.UserDTO;
import self.study.mymessenger.model.dto.UserTokenDTO;
import self.study.mymessenger.model.entity.User;
import self.study.mymessenger.model.jwt.JwtUtils;
import self.study.mymessenger.model.repository.UserRepository;

import java.util.Collections;

@Slf4j
@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;


    public UserTokenDTO loginUser(String username, String password) throws Exception {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            User user = (User) authentication.getPrincipal();

            return UserTokenDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .token(jwt)
                    .build();
        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }

    public UserDTO signupUser(String username, String password) {

        User user = User.builder()
                .username(username)
                .password(encoder.encode(password))
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")))
                .build();

        System.out.println(userRepository.save(user));
        return UserDTO.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .build();
    }

}
