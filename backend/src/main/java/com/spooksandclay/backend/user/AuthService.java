package com.spooksandclay.backend.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto create(RegisterRequest request) {

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole("customer");

        User savedUser = userRepository.save(user);

        return toUserDto(savedUser);
    }


    public UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
