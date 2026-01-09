document.addEventListener('DOMContentLoaded', () => { 
    // --- Element Selectors ---
    const themeToggle = document.getElementById('theme-toggle');
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherResultContainer = document.getElementById('weather-result-container');
    const body = document.body;
    const navButtons = document.querySelectorAll('.nav-button');
    const pages = document.querySelectorAll('.page');
    const mapIframe = document.getElementById('weather-map-iframe');
    const mapStatus = document.getElementById('map-status');
    const aboutLocationContainer = document.getElementById('about-location-container');
    // --- Chatbot logic ---
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-message");
const chatSend = document.getElementById("chat-send");

if (chatBox && chatInput && chatSend) {
    chatSend.addEventListener("click", sendChatMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendChatMessage();
        }
    });
}

async function sendChatMessage() {
    const q = chatInput.value.trim();
    if (!q) return;

    // Show user message
    const userDiv = document.createElement("div");
    userDiv.className = "chat-message user";
    userDiv.textContent = "You: " + q;
    chatBox.appendChild(userDiv);

    // Clear input
    chatInput.value = "";

    // Placeholder for bot reply
    const botDiv = document.createElement("div");
    botDiv.className = "chat-message bot";
    botDiv.textContent = "AI is thinking...";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const res = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: q })
        });

        const json = await res.json();
        botDiv.textContent = "Bot: " + (json.reply || "No reply from AI");
    } catch (err) {
        console.error(err);
        botDiv.textContent = "Error contacting AI.";
    }
}


    // --- NEW: Map Search Elements ---
    const mapSearchInput = document.getElementById("map-search-input");
    const mapSearchBtn = document.getElementById("map-search-btn");
    const mapClearBtn = document.getElementById("map-clear-btn");

    // --- NEW: Auth & Profile Elements ---
    const loginBtn = document.getElementById("login-btn");
    const signupBtn = document.getElementById("signup-btn");
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");
    const logoutBtn = document.getElementById("logout-btn");

    // --- State Variables ---
    const apiKey = '134c2de685a5421b9aa183048253108';
    let userCoords = null;
    let lastSearchedData = null;

    // --- Initial Setup ---
    getUserLocation();

    // --- Event Listeners ---
    themeToggle.addEventListener('click', toggleTheme);
    weatherForm.addEventListener('submit', handleWeatherFormSubmit);
    navButtons.forEach(button => {
        if (button.getAttribute('data-page')) {
            button.addEventListener('click', handleNavClick);
        }
    });

    // --- Map Search Events ---
    if (mapSearchBtn && mapSearchInput && mapClearBtn) {
        mapSearchBtn.addEventListener("click", () => {
            const city = mapSearchInput.value.trim();
            if (city) {
                updateMapToCity(city);
            }
        });

        mapClearBtn.addEventListener("click", () => {
            mapSearchInput.value = "";
            updateMapToUserLocation();
        });
    }

    // --- Auth Buttons ---
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            alert("Login functionality coming soon!");
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            alert("Signup functionality coming soon!");
        });
    }

    // --- Profile Menu ---
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener("click", () => {
            profileDropdown.style.display =
                profileDropdown.style.display === "block" ? "none" : "block";
        });
    }

    // Close dropdown if clicked outside
    document.addEventListener("click", (e) => {
        if (profileDropdown && !profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.style.display = "none";
        }
    });

    // --- Logout ---
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            alert("Logged out successfully!");
            window.location.reload();
        });
    }

    // --- Functions (Original + New) ---
    function handleNavClick(e) {
        e.preventDefault();
        const targetPageId = e.target.getAttribute('data-page');

        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(`${targetPageId}-page`).classList.add('active');

        navButtons.forEach(btn => {
            if(btn.getAttribute('data-page')) btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        if (targetPageId === 'about-location') {
            displayAboutLocation();
        } else if (targetPageId === 'map') {
            updateMapToUserLocation();
        }
    }

    async function handleWeatherFormSubmit(e) {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }

    async function getWeather(city) {
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`;
        weatherResultContainer.innerHTML = '<p class="placeholder-text">Fetching weather data...</p>';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'City not found.');
            }
            lastSearchedData = await response.json();
            displayWeather(lastSearchedData);
        } catch (error) {
            displayError(error.message);
            console.error('Fetch Error:', error);
        }
    }

    function displayWeather(data) {
        const { location, current } = data;
        const iconUrl = `https:${current.condition.icon}`;

        const weatherHTML = `
            <div style="text-align: center;">
                <h2>${location.name}, ${location.country}</h2>
                <img src="${iconUrl}" alt="${current.condition.text}" style="width: 100px; height: 100px;">
                <p style="font-size: 3rem; font-weight: bold; margin: 10px 0;">${Math.round(current.temp_c)}°C</p>
                <p style="font-size: 1.2rem; text-transform: capitalize;">${current.condition.text}</p>
            </div>`;
        weatherResultContainer.innerHTML = weatherHTML;
    }
    
   /* --- PASTE THIS NEW FUNCTION INTO YOUR script.js FILE --- */

function displayAboutLocation() {
    if (!lastSearchedData) {
        aboutLocationContainer.innerHTML = '<p class="placeholder-text">Please search for a city on the Home page first.</p>';
        return;
    }

    const { location, current, forecast } = lastSearchedData;
    const astro = forecast.forecastday[0].astro;
    const wind_ms = (current.wind_kph / 3.6).toFixed(1);

    let distanceHtml = "Enable location access to calculate distance.";
    if (userCoords) {
        const distance = calculateDistance(userCoords.lat, userCoords.lon, location.lat, location.lon);
        distanceHtml = `${distance.toFixed(1)} km from your location`;
    }

    // This HTML is updated to match your new screenshot's layout and icons
    const detailsHTML = `
        <h2>About ${location.name}, ${location.country}</h2>
        <ul class="location-details-list">
            <li><i class="fas fa-clock"></i> Local Time: ${location.localtime.split(' ')[1]}</li>
            <li><i class="fas fa-calendar-alt"></i> Date: ${new Date(location.localtime).toLocaleDateString()}</li>
            <li><i class="fas fa-road"></i> ${distanceHtml}</li>
            <li><i class="fas fa-thermometer-half"></i> Temperature: ${current.temp_c}°C</li>
            <li><i class="fas fa-tint"></i> Humidity: ${current.humidity}%</li>
            <li><i class="fas fa-wind"></i> Wind: ${wind_ms} m/s</li>
            <li><i style="opacity:0;"></i> Sunrise: ${astro.sunrise}</li>
            <li><i style="opacity:0;"></i> Sunset: ${astro.sunset}</li>
        </ul>`;
    aboutLocationContainer.innerHTML = detailsHTML;
}

/* --- END OF JAVASCRIPT SNIPPET --- */

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userCoords = { lat: position.coords.latitude, lon: position.coords.longitude };
                    updateMapToUserLocation();
                },
                () => {
                    console.error("Geolocation access was denied.");
                    updateMapToUserLocation();
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            updateMapToUserLocation();
        }
    }
    

    function updateMapToUserLocation() {
        let lat = userCoords ? userCoords.lat : 28.61;
        let lon = userCoords ? userCoords.lon : 77.23;
        let zoom = userCoords ? 10 : 5;
        
        mapStatus.textContent = userCoords ? 'Map centered on your location.' : 'Location access denied. Showing default map.';
        mapIframe.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=${zoom}&overlay=wind`;
    }

    async function updateMapToCity(city) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon, name, country } = data[0];
                mapIframe.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=10&marker=${lat},${lon}&overlay=wind`;
                mapStatus.textContent = `Map centered on ${name}, ${country}`;
            } else {
                mapStatus.textContent = "City not found. Try again.";
            }
        } catch (err) {
            console.error("Map update error:", err);
            mapStatus.textContent = "Error updating map.";
        }
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function displayError(message) {
        weatherResultContainer.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
    }

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        themeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
});
