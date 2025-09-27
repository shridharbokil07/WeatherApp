console.log("JavaScript is working!");

// ✅ Your API key
const apiKey = "b6ae5bd0b82bf7a9d842aa2e4e677262";

// Get elements
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Function to fetch weather
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

      // ✅ Update HTML with API data
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("condition").textContent = data.weather[0].description;
      document.getElementById("cityName").textContent = `City: ${data.name}`;
      document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      // Clear error message if data is fetched successfully
      document.getElementById("errorMessage").textContent = "";
    })
    .catch(error => {
      console.error("❌ Error fetching weather:", error);

      // Instead of alert, show error inside the page
      document.getElementById("errorMessage").textContent =
        "⚠️ Could not fetch weather. Please try again.";
    });
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
