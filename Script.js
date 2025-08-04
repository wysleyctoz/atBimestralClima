const apiKey = "289e11dbcf744b3ab7a163706250408";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");

const cityName = document.getElementById("city-name");
const localTime = document.getElementById("local-time");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uv-index");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) return;

    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Cidade não encontrada.");
        }

        const data = await response.json();
        renderWeatherData(data);
    } catch (error) {
        showError(error.message);
    }
}

function renderWeatherData(data) {
    weatherResult.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    const current = data.current;
    const location = data.location;

    cityName.textContent = `${location.name}, ${location.country}`;
    localTime.textContent = `Hora local: ${location.localtime}`;
    weatherIcon.src = current.condition.icon;
    weatherIcon.alt = current.condition.text;
    temperature.textContent = `${current.temp_c}°C`;
    condition.textContent = current.condition.text;

    feelsLike.textContent = `${current.feelslike_c}°C`;
    humidity.textContent = `${current.humidity}%`;
    windSpeed.textContent = `${current.wind_kph} km/h`;
    pressure.textContent = `${current.pressure_mb} mb`;
    visibility.textContent = `${current.vis_km} km`;
    uvIndex.textContent = current.uv;
}

function showError(message) {
    weatherResult.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.querySelector("p").textContent = message;
}
