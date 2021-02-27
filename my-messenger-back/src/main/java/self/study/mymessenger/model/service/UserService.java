package self.study.mymessenger.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import self.study.mymessenger.model.dto.UserListDTO;
import self.study.mymessenger.model.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserListDTO> getAllUsers(String id) {
        List<UserListDTO> users = new ArrayList<>();
        userRepository.findAll().stream()
                .filter(user -> !user.getId().equals(id))
                .forEach(user ->
                        users.add(new UserListDTO(user.getId(), user.getUsername())));
        return users;
    }

}
