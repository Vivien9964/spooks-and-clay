package com.spooksandclay.backend.user;

import com.spooksandclay.backend.config.JwtService;
import com.spooksandclay.backend.error.DuplicateEmailException;
import com.spooksandclay.backend.error.InvalidCredentialsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, UserService userService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    public UserDto create(RegisterRequest request) {

        if(userRepository.findByEmail(request.email()).isPresent()) {
            throw new DuplicateEmailException("This email already in use!");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole("customer");

        User savedUser = userRepository.save(user);

        return userService.toDto(savedUser);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseGet(() -> {
                    log.warn("Failed login attempt for email={}", request.email());
                    throw new InvalidCredentialsException("Invalid email or password!");
                });


        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            log.warn("Failed login attempt for email={}", request.email());
            throw new InvalidCredentialsException("Invalid email or password!");
        }

        log.info("User {} logged in", user.getId());

        AuthResponse response = new AuthResponse(jwtService.generateToken(user), userService.toDto(user));

        return response;

    }

}
