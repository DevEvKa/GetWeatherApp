import React from 'react';
import axios from "axios";

//hooks
import { useState } from "react";

//styles
import "./App.css";



const App = () => {
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [wind, setWind] = useState(null);
    const [clouds, setClouds] = useState(null);
    const [description, setDescription] = useState("");
  
    const apiKey = "59448ffe68637a9102bfd128ccba3d92";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
  
    async function getCurrentWeather(e) {
        e.preventDefault();
        axios.get(url)
        .then(function (response) {
            if (response.status === 200) {
                setTemperature(response.data.main.temp);
                setHumidity(response.data.main.humidity);
                setWind(response.data.wind.speed);
                setClouds(response.data.clouds.all);
                setDescription(response.data.weather[0].description);
                setMessage("");
            } else {
                throw new Error("Something went wrong!");
            }          
        })
        .catch(function (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                setMessage("Enter correct City name");
                setTemperature("");
                setHumidity("");
                setDescription("");
            }
        })
    }
//npm run build

    return (
    <div className="appContainer">
        <div>
            <form
            onKeyDown={(e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                getCurrentWeather(e);
                }
            }}
            >
                <input
                type="text"
                onChange={(e) => setCity(e.target.value)}
                placeholder="enter the name of the city"
                />
                <button
                onClick={(e) => getCurrentWeather(e)}
                type="submit"
                >
                Check
                </button>
            </form>
        </div>
        {temperature && (
            <div>
                <p>{city}</p>
                <p>Temperature: {Math.round(temperature)}°C</p>
                <p>Humidity: {humidity}</p>
                <p>Wind: {wind}</p>
                <p>Clouds: {clouds}</p>
                <p>Weather description: {description}</p>
            </div>
        )}
        <p>{message}</p>
    </div>
  );
}

export default App;