package com.spooksandclay.backend.image;

import java.util.Map;

public record UploadTicket(String uploadUrl, Map<String, String> fields) {}
