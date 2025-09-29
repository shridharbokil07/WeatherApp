console.log("JavaScript is working!");

// ✅ Your API key
const apiKey = "b6ae5bd0b82bf7a9d842aa2e4e677262";

// Get elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// ✅ Function to update current time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("currentTime").textContent = timeString;
}
setInterval(updateTime, 1000); // Update every second
updateTime(); // Call immediately

// ✅ Fetch weather by city
function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      console.log("🌦️ API Response:", data);

      // ✅ Extract data
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;
      const cityName = data.name;
      const icon = data.weather[0].icon;

      // ✅ Update HTML
      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("condition").textContent = condition;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("cityName").textContent = `City: ${cityName}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Clear error message
      document.getElementById("errorMessage").textContent = "";
    })
    .catch(error => {
      console.error("❌ Error fetching weather:", error);
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch weather. Please try again.";
    });
}

// ✅ Fetch weather by coordinates (for current location)
function getWeatherByLocation(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("📍 Location Weather:", data);

      // ✅ Extract data
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;
      const cityName = data.name;
      const icon = data.weather[0].icon;

      // ✅ Update HTML
      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("condition").textContent = condition;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("cityName").textContent = `City: ${cityName}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Clear error message
      document.getElementById("errorMessage").textContent = "";
    })
    .catch(error => {
      console.error("❌ Error fetching location weather:", error);
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch location weather.";
    });
}

// ✅ On load: Get weather of current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      getWeatherByLocation(latitude, longitude);
    },
    error => {
      console.error("Geolocation error:", error);
      // fallback city if location blocked
      getWeather("Aurangabad");
    }
  );
} else {
  // fallback if geolocation not supported
  getWeather("Aurangabad");
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    document.getElementById("errorMessage").textContent =
      "⚠️ Please enter a city name!";
  }
});
