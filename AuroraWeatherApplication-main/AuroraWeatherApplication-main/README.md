Aurora Weather ☀️
Aurora Weather is a modern, real-world weather application built to provide accurate and real-time weather information with an intuitive, user-friendly interface. This project goes beyond a simple weather app by integrating an AI-powered chatbot to enhance user interaction and provide intelligent, context-aware responses to weather-related queries.

Project Highlights ✨
Real-World Problem Solving: This application solves the common problem of needing quick, accurate weather data and forecasts. It's designed to be a practical and reliable tool for daily use.

User-Friendly Interface: The clean, responsive design ensures a seamless experience across all devices. The application features a dynamic day/night mode that changes the background and theme to match the time of day.

AI Integration: A key feature is the integrated AI Chatbot, which allows users to ask natural language questions about the weather. This showcases the ability to connect a front-end application with a powerful AI backend. * Full-Stack Application: The project is a complete full-stack solution, demonstrating a clear separation of concerns with a Java backend and a modern HTML, CSS, and JavaScript frontend.

Features 💡
Current Weather Conditions: Instantly get the temperature, humidity, and wind speed for any city worldwide.

Location Details: The "About Location" page provides detailed information, including sunrise, sunset, and the local time for a searched city. It can even calculate the distance from your current location if you enable access.

Live Weather Map: Visualize global weather patterns with an embedded, interactive weather map powered by Windy.com.

AI Chatbot: Ask questions like "What's the weather in London tomorrow?" or "Is it going to rain this week?" and receive an intelligent response.

User Authentication: The application includes a basic user profile feature with login and signup placeholders, demonstrating a path toward user-specific functionality.

Dynamic UI: A "dark mode" toggle allows users to switch between a day theme and a more visually pleasing night theme.

Technologies Used 💻
Backend (Java)

Spring Boot: The core framework for the backend services and REST API endpoints.

Maven: Manages project dependencies and the build process.

OpenWeatherMap & WeatherAPI: External APIs used to fetch weather data.

OpenAI API: Powers the intelligent chatbot functionality.

RestTemplate: Used for making HTTP requests to external APIs.

Frontend (HTML, CSS, JavaScript)

HTML5: Structures the web pages.

CSS3: Styles the application, including dynamic themes and responsive layouts.

JavaScript: Handles all client-side logic, including fetching data and managing UI interactions.

Font Awesome: Provides the icons used throughout the interface.

Project Structure 📂
AuroraWeather/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/weatherapp/auroraweather/
│   │   │       ├── controller/  # Spring REST controllers (e.g., ChatController.java)
│   │   │       ├── model/       # Data models (e.g., WeatherResponse.java)
│   │   │       └── service/     # Business logic & API calls (e.g., OpenAIService.java)
│   │   └── resources/
│   │       ├── static/          # Frontend files (index.html, style.css, script.js)
│   │       └── application.properties # Configuration settings
├── .mvn/
├── .vscode/
├── pom.xml                      # Maven project configuration
└── README.md                    # This file
How to Run Locally 🚀
Clone the repository:

Bash

git clone https://github.com/YourUsername/AuroraWeather.git
cd AuroraWeather
Configure API Keys:

Create an account and get an API key from OpenWeatherMap or WeatherAPI.

Obtain a separate API key from OpenAI for the chatbot.

Open src/main/resources/application.properties and replace the placeholder values:

Properties

weather.api.key=YOUR_OPENWEATHERMAP_API_KEY
openai.api.key=YOUR_OPENAI_API_KEY
Build and Run the Java Application:

Use Maven to build the project:

Bash

mvn clean install
Run the Spring Boot application from your IDE or the command line:

Bash

mvn spring-boot:run
The backend will start on http://localhost:8102 (as configured in application.properties).

Open the Frontend:

Navigate to src/main/resources/static/index.html in your browser.

Alternatively, you can access the application from the server at http://localhost:8102.
