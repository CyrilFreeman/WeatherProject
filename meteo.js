const loader = document.querySelector(".loader-container");

// Fetch city from conf.json
fetch("conf.json")
  .then((response) => response.json())
  .then((data) => {
    const city = data.city;
    const country = data.country;

    const apiKey = "523d773f11d9f264c85fc0c42f94ddf3"; // replace with your actual API key

    async function getWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
        );
        if (!response.ok) {
          if (response.status === 404) {
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
    setInterval(getWeatherData, 3600000); // 3600000 ms = 1 hour

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
      temperature.textContent = `${data.main.temp}°C`;
      windSpeed.textContent = `Vent: ${data.wind.speed} m/s`;
      humidity.textContent = `Humidité: ${data.main.humidity}%`;
      infoIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      infoIcon.style.width = "150px";
      loader.classList.remove("active");
    }
  })
  .catch((error) => {
    console.error(error);
  });
