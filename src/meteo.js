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
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`Weather in ${city}: ${data.weather[0].main} `); // Log weather data
      console.log(`Weather in ${city}: ${data.weather[0].description}`); // decritpion de la meteo
      console.log(`Weather in ${city}: ${data.main.temp} `); // temperature en kelvin
      console.log(`Weather in ${city}: ${data.wind.speed}`);
      console.log(data.weather[0].icon);
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
            console.log(`Weather in ${city}: ${data.wind.speed}`); // Log updated weather data
          });
        console.log(`Weather in ${city}: ${data.weather[0].description}`); // Log updated weather data
      }, 3600000); // 3600000 ms = 1 hour
    });
});
