require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`;

    try {
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();

        if (!weatherResponse.ok) {
            throw new Error(`Error ${weatherResponse.status}, ${weatherResponse.statusText}`);
        }

        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});