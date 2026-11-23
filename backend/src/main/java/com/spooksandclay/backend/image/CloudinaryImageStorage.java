package com.spooksandclay.backend.image;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class CloudinaryImageStorage implements ImageStorage {

    private final String cloudName;
    private final String apiKey;
    private final String apiSecret;
    private final String uploadPreset;

    public CloudinaryImageStorage(
            @Value("${app.images.cloudinary.cloud-name}") String cloudName,
            @Value("${app.images.cloudinary.api-key}") String apiKey,
            @Value("${app.images.cloudinary.api-secret}") String apiSecret,
            @Value("${app.images.cloudinary.upload-preset}") String uploadPreset
    ) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.uploadPreset = uploadPreset;
    }

    @Override
    public UploadTicket createUploadTicket() {
        Map<String, String> signedParams = Map.of(
                "timestamp", String.valueOf(Instant.now().getEpochSecond()),
                "upload_preset", uploadPreset
        );

        Map<String, String> fields = new HashMap<>(signedParams);
        fields.put("api_key", apiKey);
        fields.put("signature", sign(signedParams, apiSecret));

        return new UploadTicket("https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload", fields);
    }

    static String sign(Map<String, String> params, String apiSecret) {
        String toSign = new TreeMap<>(params).entrySet().stream()
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.joining("&"));

        try{
            byte[] hash = MessageDigest.getInstance("SHA-1").digest((toSign + apiSecret).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e ) {
            throw new IllegalStateException("SHA-1 not available", e);
        }
    }
}
