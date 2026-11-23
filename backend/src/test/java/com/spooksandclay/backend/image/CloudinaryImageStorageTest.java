package com.spooksandclay.backend.image;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class CloudinaryImageStorageTest {

    @Test
    void signMatchesCloudinaryDocsExample() {
        Map<String, String> params = Map.of(
                "eager", "w_400,h_300,c_pad|w_260,h_200,c_crop",
                "public_id", "sample_image",
                "timestamp", "1315060510"
        );

        assertThat(CloudinaryImageStorage.sign(params, "abcd"))
                .isEqualTo("bfd09f95f331f558cbd1320e67aa8d488770583e");
    }

    @Test
    void ticketIsSignedAndNeverContainsTheSecret() {
        CloudinaryImageStorage storage = new CloudinaryImageStorage("demo-cloud", "123", "super-secret", "spooks_products");

        UploadTicket ticket = storage.createUploadTicket();

        assertThat(ticket.uploadUrl()).isEqualTo("https://api.cloudinary.com/v1_1/demo-cloud/image/upload");
        assertThat(ticket.fields())
                .containsKeys("api_key", "timestamp", "upload_preset", "signature")
                .doesNotContainValue("super-secret");

        String expected = CloudinaryImageStorage.sign(
                Map.of("timestamp", ticket.fields().get("timestamp"), "upload_preset", "spooks_products"),
                "super-secret");
        assertThat(ticket.fields().get("signature")).isEqualTo(expected);
    }

}
