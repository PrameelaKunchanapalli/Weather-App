const API_KEY = 'aafe41d4e3d545e7960141938251804'; 
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

async function fetchWeatherData(location) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}`);
    const data = await response.json();
    console.log(data); 
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function processWeatherData(data) {
  return {
    location: data.location.name,
    country: data.location.country,
    temp_c: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
  };
}

function displayWeather(weather) {
  const display = document.getElementById('weatherDisplay');
  display.innerHTML = `
    <h2>${weather.location}, ${weather.country}</h2>
    <p>${weather.condition}</p>
    <p>${weather.temp_c}°C</p>
    <img src="https:${weather.icon}" alt="${weather.condition}">
  `;
}

const form = document.getElementById('locationForm');
const input = document.getElementById('locationInput');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const display = document.getElementById('weatherDisplay');
  display.textContent = 'Loading...';
  const location = input.value;
  const rawData = await fetchWeatherData(location);
  if (!rawData || rawData.error) {
    display.textContent = "Could not fetch weather for that location.";
    return;
  }
  const weather = processWeatherData(rawData);
  console.log(weather); 
  displayWeather(weather);
});
