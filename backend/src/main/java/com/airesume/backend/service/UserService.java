package com.airesume.backend.service;

import com.airesume.backend.entity.User;
import com.airesume.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;  // ⬅️ added

    public User register(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already in use");
        }

        String token = UUID.randomUUID().toString();

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(User.Role.ROLE_USER)
                .enabled(false)
                .verifyToken(token)
                .deleted(false)
                .build();

        user = userRepository.save(user);

        // ⬅️ Send verification email
        emailService.sendVerificationEmail(email, name, token);

        return user;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User verifyEmail(String token) {
        User user = userRepository.findByVerifyToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        user.setEnabled(true);
        user.setVerifyToken(null);
        return userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}