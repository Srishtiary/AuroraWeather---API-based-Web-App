package com.weatherapp.auroraweather;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuroraWeatherApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuroraWeatherApplication.class, args);
        System.out.println("🚀 Aurora Weather App is running on http://localhost:8080");
    }
}

