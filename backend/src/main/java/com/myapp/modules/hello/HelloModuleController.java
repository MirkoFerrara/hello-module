package com.myapp.modules.hello;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import com.myapp.modules.HelloModuleService;

import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/modules/hello-module")
@RequiredArgsConstructor
@Slf4j
public class HelloModuleController {
    
    private final HelloModuleService service;
    
    @GetMapping("/message")
    public Mono<Map<String, String>> getMessage() {
        log.info("📨 Hello Module: getMessage called");
        
        return service.getGreetingMessage()
            .map(message -> Map.of(
                "message", message,
                "timestamp", LocalDateTime.now().toString(),
                "module", "hello-module"
            ));
    }
    
    @GetMapping("/info")
    public Mono<Map<String, String>> getInfo() {
        return Mono.just(Map.of(
            "name", "Hello Module",
            "version", "1.0.0",
            "description", "Modulo di esempio",
            "author", "Mirko",
            "status", "active"
        ));
    }
}