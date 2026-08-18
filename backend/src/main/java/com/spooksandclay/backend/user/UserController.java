package com.spooksandclay.backend.user;

import com.spooksandclay.backend.error.SelfRoleChangeException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/users/me")
    public ResponseEntity<UserDto> me(Authentication authentication) {
        Long callerId = Long.parseLong(authentication.getName());
        UserDto user = userService.getById(callerId);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/api/users/{id}/role")
    public ResponseEntity<UserDto> updateRole(@PathVariable Long id, @Valid @RequestBody UpdateRoleRequest request, Authentication authentication) {

        Long callerId = Long.parseLong(authentication.getName());

        if(id.equals(callerId)) {
            throw new SelfRoleChangeException("Unable to update role!");
        }

        UserDto updated = userService.updateRole(id, request.role());

        return ResponseEntity.ok(updated);
    }
}
