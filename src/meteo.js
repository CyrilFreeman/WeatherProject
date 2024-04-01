const fs = require("fs");

// const loader = document.querySelector(".loader-container");
// const errorInformation = document.querySelector(".error-information");

// Read city from conf.json
fs.readFile("conf.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const city = JSON.parse(data).city;

  // Fetch weather data from OpenWeatherMap API
  const apiKey = "523d773f11d9f264c85fc0c42f94ddf3"; // replace with your actual API key
  function getWeatherData() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(`Weather in ${city}: ${data.weather[0].main} `); // Log weather data
        console.log(`Weather in ${city}: ${data.weather[0].description}`); // decritpion de la meteo
        console.log(`Weather in ${city}: ${data.main.temp} °C `); // temperature en celsus
        console.log(`Weather in ${city}: ${data.wind.speed} m/s`); //vitese du vent en mètre par seconde
        console.log(`Weather in ${city}: ${data.main.humidity} %`); //humidité en pourcentage
        console.log(data.weather[0].icon); // numéros de l'icon
        // Update weather data every hour
        setInterval(() => {
          fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(`Weather in ${city}: ${data.weather[0].main} `); // Log weather data
              console.log(`Weather in ${city}: ${data.weather[0].description}`); // decritpion de la meteo
              console.log(`Weather in ${city}: ${data.main.temp} `); // temperature en kelvin
              console.log(`Weather in ${city}: ${data.wind.speed} + 'm/s'`); // Log updated weather data
            });
          console.log(`Weather in ${city}: ${data.weather[0].description}`); // Log updated weather data
        }, 3600000); // 3600000 ms = 1 hour
      });
  }

  getWeatherData();
});
