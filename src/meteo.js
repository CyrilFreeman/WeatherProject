const fs = require("fs");

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
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(`Weather in ${city}: ${data.weather[0].main}`); // Log weather data

      // Update weather data every hour
      setInterval(() => {
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(`Weather in ${city}: ${data.weather[0].main}`); // Log updated weather data
          });
      }, 3600000); // 3600000 ms = 1 hour
    });
});
