package com.pm.authservice.config;

import com.pm.authservice.model.User;
import com.pm.authservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                if (userRepository.findByEmail("testuser@test.com").isEmpty()) {
                    User user = new User();
                    user.setId(UUID.fromString("223e4567-e89b-12d3-a456-426614174006"));
                    user.setEmail("testuser@test.com");
                    user.setPassword(passwordEncoder.encode("password123"));
                    user.setRole("ADMIN");
                    userRepository.save(user);
                    System.out.println("Seeded test user: testuser@test.com");
                } else {
                    System.out.println("Test user already exists");
                }
            } catch (Exception e) {
                System.out.println("Seeding skipped: " + e.getMessage());
            }
        };
    }
}
