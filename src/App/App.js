import React from 'react';
import axios from "axios";

//hooks
import { useState } from "react";

//images
import sun from'../images/sun.png';

//styles
import "./App.css";



const App = () => {
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [temperatureMax, setTemperatureMax] = useState(null);
    const [temperatureLow, setTemperatureLow] = useState(null);
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
                setTemperatureMax(response.data.main.temp_max);
                setTemperatureLow(response.data.main.temp_min);
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

    return (
    <div className="app__container">
        <header className="app__header header">
            <h1 className="app__title">Weather</h1>
            <div className="app__form-container">
                <form
                className="app__form form"
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    getCurrentWeather(e);
                    }
                }}
                >
                    <input
                    type="text"
                    className="form__input"
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter the name of the city"
                    />
                    <button
                    className="form__button"
                    onClick={(e) => getCurrentWeather(e)}
                    type="submit"
                    >
                    Check
                    </button>
                </form>
            </div>
            <p className="app__city">{city}</p>
        </header>
        
        {temperature && (
            <div className="app__weather-parameters parameters"> 
                <div className="parameters__temperature-container temperature">
                    <div className="temperature__descr">
                        <p className="temperature__value_main">{Math.round(temperature)}°</p>
                        <div className="temperature__others">
                            <p className="temperature__value_high">H: {Math.round(temperatureMax)}°</p>
                            <p className="temperature__value_low">L: {Math.round(temperatureLow)}°</p>  
                        </div>
                    </div>
                    <img className="temperature__image" src={sun} alt="weather"/>   
                </div>
 
                <div className="parameters__other other">
                    <p className="other__humidity">Humidity: {humidity}%</p>
                    <p className="other__wind">Wind: {Math.round(wind)}m/s</p>  
                </div>                      
            </div> 
        )}
        <p>{message}</p>
    </div>
  );
}

export default App;