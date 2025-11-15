package com.myapp.modules;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Random;

@Service
@Slf4j
public class HelloModuleService {
    
    private final String[] messages = {
        "Ciao! Questo messaggio arriva dal backend del modulo! 🚀",
        "Hello from the module backend! Everything is working! ✨",
        "Il modulo è attivo e funzionante! 🎉",
        "Backend module says: All systems go! 💪"
    };
    
    public Mono<String> getGreetingMessage() {
        String message = messages[new Random().nextInt(messages.length)];
        log.info("Generating greeting message: {}", message);
        return Mono.just(message);
    }
}