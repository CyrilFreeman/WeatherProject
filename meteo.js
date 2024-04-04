const loader = document.querySelector(".loader-container");

async function getWeatherData() {
  try {
    const response = await fetch("http://localhost:3000/weather");

    if (!response.ok) {
      if (response.status === 404) {
        const cityName = document.querySelector(".city-name");
        cityName.textContent = `La ville '${city}' n'a pas été trouvée.`;
        throw new Error(`La ville '${city}' n'a pas été trouvée.`);
      } else {
        throw new Error(`Error ${response.status}, ${response.statusText}`);
      }
    }
    const weatherData = await response.json();
    populateUI(weatherData);
  } catch (error) {
    console.error(error);
    loader.classList.remove("active");
  }
}

getWeatherData();

// Update weather data every hour
function populateUI(data) {
  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const description = document.querySelector(".description");
  const temperature = document.querySelector(".temperature");
  const infoIcon = document.querySelector(".info-icon");
  const windSpeed = document.querySelector(".wind-speed");
  const humidity = document.querySelector(".humidity");

  cityName.textContent = city;
  countryName.textContent = country;
  description.textContent = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  windSpeed.textContent = `Vent: ${Math.round(data.wind.speed * 36) / 10} km/h`;
  humidity.textContent = `Humidité: ${data.main.humidity}%`;
  infoIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  infoIcon.style.width = "150px";
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + data.weather[0].main + "')";
  loader.classList.remove("active");
}

setInterval(getWeatherData, 5000); // Refresh weather data every 5 seconds
