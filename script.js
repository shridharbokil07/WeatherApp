console.log("✅ JavaScript is connected!");

const apiKey = "b6ae5bd0b82bf7a9d842aa2e4e677262";
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

// ✅ Update time every second
function updateTime() {
  const now = new Date();
  document.getElementById("currentTime").textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// ✅ Show loading indicator
function showLoading() {
  loading.classList.remove("hidden");
}
function hideLoading() {
  loading.classList.add("hidden");
}

// ✅ Display error message
function showError(msg) {
  errorMessage.textContent = msg;
}

// ✅ Fetch weather by city
async function getWeather(city) {
  showLoading();
  showError("");

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const { temp, humidity } = data.main;
    const condition = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    document.getElementById("temperature").textContent = `${Math.round(temp)}°C`;
    document.getElementById("condition").textContent = condition;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
    document.getElementById("cityName").textContent = `City: ${cityName}`;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${icon}@2x.png`;

    await getForecast(cityName);
  } catch (err) {
    console.error("❌ Error fetching weather:", err);
    showError("⚠️ Could not fetch weather. Please check the city name or try again later.");
  } finally {
    hideLoading();
  }
}

// ✅ Fetch forecast
async function getForecast(city) {
  const forecastGrid = document.querySelector(".forecast-grid");
  forecastGrid.innerHTML = "<p class='placeholder-text'>Loading forecast...</p>";

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Forecast not available");
    const data = await res.json();

    const dailyForecast = [];
    const seen = new Set();

    data.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      const time = item.dt_txt.split(" ")[1];
      if (!seen.has(date) && time === "12:00:00") {
        seen.add(date);
        dailyForecast.push({
          date,
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
          condition: item.weather[0].description
        });
      }
    });

    forecastGrid.innerHTML = "";
    dailyForecast.slice(0, 5).forEach(day => {
      const dayName = new Date(day.date).toLocaleDateString("en-US", { weekday: "short" });
      forecastGrid.insertAdjacentHTML("beforeend", `
        <div class="forecast-day">
          <p>${dayName}</p>
          <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.condition}">
          <p>${day.temp}°C</p>
        </div>
      `);
    });
  } catch (err) {
    console.error("❌ Forecast error:", err);
    forecastGrid.innerHTML = "<p class='error'>⚠️ Unable to load forecast data.</p>";
  }
}

// ✅ Get weather by location
function getWeatherByLocation(lat, lon) {
  showLoading();
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch location weather");
      return res.json();
    })
    .then(data => {
      const city = data.name;
      getWeather(city);
    })
    .catch(err => {
      console.error("❌ Location weather error:", err);
      showError("⚠️ Unable to fetch your location. Showing default city.");
      getWeather("Aurangabad");
    })
    .finally(hideLoading);
}

// ✅ Geolocation on load
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => getWeatherByLocation(pos.coords.latitude, pos.coords.longitude),
    () => getWeather("Aurangabad")
  );
} else {
  getWeather("Aurangabad");
}

// ✅ Search Events
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) getWeather(city);
  else showError("⚠️ Please enter a city name!");
});

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});
