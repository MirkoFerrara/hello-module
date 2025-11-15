package com.myapp.modules.hello;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.myapp.modules.hello")
public class HelloModuleConfiguration {
    
    public HelloModuleConfiguration() {
        System.out.println("✅ Hello Module Backend initialized!");
    }
}