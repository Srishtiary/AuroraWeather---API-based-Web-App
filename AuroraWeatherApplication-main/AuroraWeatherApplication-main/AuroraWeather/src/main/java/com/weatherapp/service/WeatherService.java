package com.weatherapp.service; // <-- Correct package

import com.weatherapp.model.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service; // <-- IMPORTANT ANNOTATION
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service // <-- This annotation tells Spring "This is a bean that you can inject"
public class WeatherService {

    @Value("${weather.api.base-url}")
    private String weatherApiBaseUrl;

    @Value("${weather.api.key}")
    private String apiKey;

    public WeatherResponse getCurrentWeather(String city) {
        // Construct the full API URL from properties file
        String url = String.format("%s/weather?q=%s&appid=%s&units=metric", weatherApiBaseUrl, city, apiKey);
        
        RestTemplate restTemplate = new RestTemplate();
        try {
            // Make the API call and map the JSON response to our WeatherResponse class
            return restTemplate.getForObject(url, WeatherResponse.class);
        } catch (HttpClientErrorException.NotFound e) {
            // This handles the case where the API says the city was not found
            System.err.println("API Error: City not found: " + city);
            return null;
        } catch (Exception e) {
            // This is a general catch-all for other errors (e.g., network issues, invalid API key)
            System.err.println("An error occurred while fetching weather data: " + e.getMessage());
            return null;
        }
    }
}