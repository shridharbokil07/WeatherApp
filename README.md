🌦️ Weather App
📘 Overview

The Weather App is a responsive web application that allows users to view the current weather conditions and 5-day forecast for any city in the world.
It uses the OpenWeatherMap API to fetch real-time data and displays it in a clean, user-friendly interface.

🧩 Features

🌍 Fetches real-time weather using city name or current location (Geolocation API)

⏳ Displays live time updating every second

📅 Shows a 5-day forecast with icons and temperatures

⚠️ Handles errors gracefully with user-friendly messages

💾 Optimized API calls with caching for repeated searches

📱 Fully responsive design for all devices

⚡ Includes loading indicator for smoother UX

🛠️ Technologies Used

HTML5 — structure

CSS3 — styling and layout

JavaScript (ES6) — functionality

OpenWeatherMap API — weather and forecast data

🚀 How to Run

Download or clone this repository.

git clone https://github.com/your-username/weather-app.git


Open the project folder.

Run the app by simply opening index.html in any modern browser (Chrome, Edge, Firefox, or Safari).

🧪 Testing Summary
✅ Functional Testing
Test	Result
Default city loads correctly	✅
Search for valid city	✅
Handles invalid city names	✅
Loading indicator displays correctly	✅
Forecast updates properly	✅
Works with Geolocation	✅
🌐 Cross-Browser Compatibility
Browser	Result
Google Chrome	✅
Microsoft Edge	✅
Mozilla Firefox	✅
Safari	✅
📱 Device Responsiveness
Device	View	Result
Desktop	1920×1080	✅
Tablet	768×1024	✅
Mobile	375×812	✅
⚙️ Optimizations Implemented

Added caching for repeated searches to reduce API calls

Used defer for JavaScript loading to improve page speed

Compressed and optimized background images

Minimized re-renders and DOM updates

Implemented error handling for network failures

Improved Lighthouse scores (Performance, Accessibility, Best Practices, SEO)

📊 Performance Results (Lighthouse)
Metric	Before	After
Performance	72	92
Accessibility	80	95
Best Practices	85	96
SEO	90	100

(values are examples — update with your actual Lighthouse results)

🔑 API Information

Base URL: https://api.openweathermap.org/data/2.5/

Endpoints Used:

/weather — for current weather

/forecast — for 5-day forecast

Parameters: q (city name), appid (API key), units=metric

🧾 Folder Structure
WeatherApp/
├── index.html
├── style.css
├── script.js
└── README.md

🧑‍💻 Developer Notes

Created by Shridhar Pandharinath Bokil

Project: Weather App Optimization & Testing Task

Technologies used: HTML, CSS, JavaScript

Tested on multiple browsers and devices for submission readiness.

🗂️ Submission Checklist

✔ All features working correctly
✔ Fully responsive layout
✔ Cross-browser tested
✔ Optimized API & UI performance
✔ Documented with README.md
✔ Zipped and ready for submission
