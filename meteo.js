const loader = document.querySelector(".loader-container");

// Fetch city from conf.json
fetch("conf.json")
  .then((response) => response.json())
  .then((data) => {
    const city = data.city;

    const apiKey = "523d773f11d9f264c85fc0c42f94ddf3"; // replace with your actual API key

    async function getWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
        );
        if (!response.ok) {
          throw new Error(`Error ${response.status}, ${response.statusText}`);
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
    setInterval(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(`Weather in ${city}: ${data.weather[0].main}`);
          console.log(`Weather in ${city}: ${data.weather[0].description}`);
          console.log(`Weather in ${city}: ${data.main.temp}`);
          console.log(`Weather in ${city}: ${data.wind.speed} m/s`);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 3600000); // 3600000 ms = 1 hour

    const description = document.querySelector(".description");
    const temperature = document.querySelector(".temperature");
    const infoIcon = document.querySelector(".info-icon");

    function populateUI(data) {
      description.textContent = data.weather[0].description;
      temperature.textContent = `${data.main.temp}°`;
      infoIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      infoIcon.style.width = "150px";
      loader.classList.remove("active");
    }
  })
  .catch((error) => {
    console.error(error);
  });
