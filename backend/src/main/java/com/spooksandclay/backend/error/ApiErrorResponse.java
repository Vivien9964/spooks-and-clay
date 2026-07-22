package com.spooksandclay.backend.error;

import java.util.List;
import java.util.Map;

public record ApiErrorResponse(
    int status,
    String message,
    Map<String, List<String>> fieldErrors
){}
