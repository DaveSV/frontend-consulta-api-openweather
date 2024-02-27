const apiKey = '';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weatherIcon'); // Asegúrate de tener este elemento en tu HTML
const feelsLikeElement = document.getElementById('feelsLike'); // Asegúrate de tener este elemento en tu HTML
const humidityElement = document.getElementById('humidity'); // Asegúrate de tener este elemento en tu HTML
const windSpeedElement = document.getElementById('windSpeed'); // Asegúrate de tener este elemento en tu HTML

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            // Añadir imagen del ícono del clima
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            iconElement.src = iconUrl;
            iconElement.alt = data.weather[0].description; // Descripción del clima como texto alternativo
            // Añadir sensación térmica
            feelsLikeElement.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
            // Añadir humedad
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            // Añadir velocidad del viento
            windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = 'Unable to retrieve weather data.';
            // Limpiar los demás elementos en caso de error
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            iconElement.src = '';
            feelsLikeElement.textContent = '';
            humidityElement.textContent = '';
            windSpeedElement.textContent = '';
        });
}
