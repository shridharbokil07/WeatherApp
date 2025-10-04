console.log("JavaScript is working!");

const apiKey = "b6ae5bd0b82bf7a9d842aa2e4e677262";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// ✅ Update current time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("currentTime").textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// ✅ Fetch weather by city
function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;
      const cityName = data.name;
      const icon = data.weather[0].icon;

      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("condition").textContent = condition;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("cityName").textContent = `City: ${cityName}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

      document.getElementById("errorMessage").textContent = "";

      // ✅ Fetch 5-day forecast
      getForecast(city);
    })
    .catch(error => {
      console.error("❌ Error fetching weather:", error);
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch weather. Please try again.";
    });
}

// ✅ Fetch weather by coordinates
function getWeatherByLocation(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const condition = data.weather[0].description;
      const cityName = data.name;
      const icon = data.weather[0].icon;

      document.getElementById("temperature").textContent = `${temperature}°C`;
      document.getElementById("condition").textContent = condition;
      document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
      document.getElementById("cityName").textContent = `City: ${cityName}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

      document.getElementById("errorMessage").textContent = "";

      // ✅ Fetch 5-day forecast by city
      getForecast(cityName);
    })
    .catch(error => {
      console.error("❌ Error fetching location weather:", error);
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch location weather.";
    });
}

// ✅ Fetch 5-day forecast for a city
function getForecast(city) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) throw new Error("Forecast not found");
      return response.json();
    })
    .then(data => {
      const dailyForecast = [];
      const seenDates = new Set();

      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        const time = item.dt_txt.split(" ")[1];
        if (!seenDates.has(date) && time === "12:00:00") {
          seenDates.add(date);
          dailyForecast.push({
            date,
            temp: item.main.temp,
            icon: item.weather[0].icon,
            condition: item.weather[0].description
          });
        }
      });

      const forecastGrid = document.querySelector(".forecast-grid");
      forecastGrid.innerHTML = "";
      dailyForecast.slice(0, 5).forEach(day => {
        const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "short" });
        const forecastHTML = `
          <div class="forecast-day">
            <p>${dayName}</p>
            <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.condition}">
            <p>${Math.round(day.temp)}°C</p>
          </div>
        `;
        forecastGrid.insertAdjacentHTML("beforeend", forecastHTML);
      });
    })
    .catch(error => {
      console.error("❌ Error fetching forecast:", error);
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch forecast.";
    });
}

// ✅ On load: get weather of current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      getWeatherByLocation(latitude, longitude);
    },
    error => {
      console.error("Geolocation error:", error);
      getWeather("Aurangabad");
    }
  );
} else {
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
