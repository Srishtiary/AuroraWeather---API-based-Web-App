package com.weatherapp.controller;

import com.weatherapp.model.WeatherResponse;
import com.weatherapp.service.WeatherService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather") // Base path for all weather-related endpoints
@CrossOrigin(origins = "*") // Allows requests from any front-end origin
public class WeatherController {

    private final WeatherService weatherService;

    // Constructor injection for the WeatherService
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public ResponseEntity<WeatherResponse> getCurrentWeather(@RequestParam(name = "city") String city) {
        // The parameter name "city" now matches what a typical front-end would send.
        WeatherResponse weatherData = weatherService.getCurrentWeather(city);
        
        if (weatherData != null) {
            return ResponseEntity.ok(weatherData);
        } else {
            // Return a 404 Not Found or another appropriate error if the city isn't found
            return ResponseEntity.status(404).body(null);
        }
    }
}