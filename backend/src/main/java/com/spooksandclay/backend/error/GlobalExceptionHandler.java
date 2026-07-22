package com.spooksandclay.backend.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, List<String>> fieldErrors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                fieldErrors
                        .computeIfAbsent(error.getField(), key -> new java.util.ArrayList<>())
                        .add(error.getDefaultMessage())
                );

        ApiErrorResponse body = new ApiErrorResponse(400, "Validation failed!", fieldErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFound(ProductNotFoundException ex) {
        ApiErrorResponse body = new ApiErrorResponse(404, ex.getMessage(), null);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }
}
