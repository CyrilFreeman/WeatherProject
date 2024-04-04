const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
app.get("/weather", async (req, res) => {
  fs.readFile("conf.json", "utf8", async (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading conf.json");
      return;
    }

    const config = JSON.parse(data);
    const city = config.city;
    const apiKey = "523d773f11d9f264c85fc0c42f94ddf3"; // replace with your actual API key

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`
      );
      const weatherData = await response.json();
      res.send(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching weather data");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
