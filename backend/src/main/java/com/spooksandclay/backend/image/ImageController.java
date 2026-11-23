package com.spooksandclay.backend.image;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class ImageController {

    private final ImageStorage imageStorage;

    public ImageController(ImageStorage imageStorage) {
        this.imageStorage = imageStorage;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/images/upload-ticket")
    public ResponseEntity<UploadTicket> createUploadTicket() {
        return ResponseEntity.ok(imageStorage.createUploadTicket());
    }
}
