const express = require("express");
const axios = require("axios");
require('dotenv').config();
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
    const apiKey = process.env.API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`;

    try {
      const weatherResponse = await axios.get(url);
      const weatherData = weatherResponse.data;

      res.json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});