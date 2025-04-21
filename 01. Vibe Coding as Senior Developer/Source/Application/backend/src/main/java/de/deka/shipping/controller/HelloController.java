package de.deka.shipping.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/public/hello")
    public String publicHello() {
        return "Öffentlicher Zugriff - Hallo vom Deka Versandjobs Backend!";
    }

    @GetMapping("/secure/hello")
    public String secureHello() {
        return "Gesicherter Zugriff - Hallo vom Deka Versandjobs Backend!";
    }
}
