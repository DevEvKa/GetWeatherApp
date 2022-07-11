import React from 'react';
import axios from "axios";

//hooks
import { useState } from "react";

//images
import sun from '../images/sunny.png';
import partlySunny from '../images/partly-cloudy.png';
import partlyCloudy from '../images/cloudy-day.png';
import heavyCloudy from '../images/cloudy.png';
import rain from '../images/raining.png';
import lightRain from '../images/rainy.png';
import drizzle from '../images/drizzle.png';
import heavyDrizzle from '../images/hailstorm.png';
import lightThunderstorm from '../images/thunderstormm.png';
import thunderstorm from '../images/thunderbolt.png';
import wetThunderstorm from '../images/thunderstorm.png';
import lightSnow from '../images/winter.png';
import wetSnow from '../images/sleet.png';
import heavySnow from '../images/snowfall.png';
import mist from '../images/foggy-day.png';
import squalls from '../images/windy.png';
import tornado from '../images/typhoon.png';

//icons
import windIcon from '../images/icons/wind.png';
import windDirectionIcon from '../images/icons/wind-direction.png';
import humidityIcon from '../images/icons/drop.png';
import sunriseIcon from '../images/icons/sunrise.png';
import sunsetIcon from '../images/icons/sunset.png';
import pressureIcon from '../images/icons/down-arrow.png';


//styles
import "./App.css";



const App = () => {
    const [message, setMessage] = useState("");
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [temperatureMax, setTemperatureMax] = useState(null);
    const [temperatureLow, setTemperatureLow] = useState(null);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(partlySunny);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [wind, setWind] = useState(null);
    const [windDirection, setWindDirection] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [timezone, setTimezone] = useState(0);
    
  
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
                setDescription(response.data.weather[0].description);
                setCity(response.data.name);
                setSunrise(response.data.sys.sunrise);
                setSunset(response.data.sys.sunset);
                setHumidity(response.data.main.humidity);
                setWind(response.data.wind.speed);
                setPressure(response.data.main.pressure);
                setTimezone(response.data.timezone);
                
                //направление ветра
                if (response.data.wind.deg>11.25 &&  response.data.wind.deg<78.75) {
                    setWindDirection('North-East'); 
                } else if (response.data.wind.deg>78.76 &&  response.data.wind.deg<101.25) {
                    setWindDirection('East'); 
                } else if (response.data.wind.deg>101.26 &&  response.data.wind.deg<168.75) {
                    setWindDirection('South-East'); 
                } else if (response.data.wind.deg>168.76 &&  response.data.wind.deg<191.25) {
                    setWindDirection('South'); 
                } else if (response.data.wind.deg>191.26 &&  response.data.wind.deg<258.75) {
                    setWindDirection('South-West'); 
                } else if (response.data.wind.deg>258.76 &&  response.data.wind.deg<281.25) {
                    setWindDirection('West'); 
                } else if (response.data.wind.deg>281.26 &&  response.data.wind.deg<326.25) {
                    setWindDirection('North-West'); 
                } else {
                    setWindDirection('North'); 
                }


                //картинка и фон
                if (response.data.weather[0].description === ("clear sky")) {
                    setImage(sun);
                    document.body.style.backgroundColor = '#fff917';
                } else if (response.data.weather[0].description === ("few clouds")) {
                    setImage(partlySunny);
                    document.body.style.backgroundColor = '#fff9ae';
                } else if (response.data.weather[0].description === ("broken clouds" || "scattered clouds" || "broken clouds")) {
                    setImage(partlyCloudy);
                    document.body.style.backgroundColor = '#fff9e1';
                } else if (response.data.weather[0].description === ("overcast clouds")) {
                    setImage(heavyCloudy);
                    document.body.style.backgroundColor = '#a6bdd7';
                } else if (response.data.weather[0].description === ("light rain" || "moderate rain" || "light intensity shower rain")) {
                    setImage(lightRain);
                    document.body.style.backgroundColor = '#d1e5f9';
                } else if (response.data.weather[0].description === ("heavy intensity rain" || "very heavy rain" || "extreme rain" || "shower rain" || "heavy intensity shower rain" || "ragged shower rain")) {
                    setImage(rain);
                    document.body.style.backgroundColor = '#bccee0';
                } else if (response.data.weather[0].description === ("light intensity drizzle" || "drizzle" || "heavy intensity drizzle" || "light intensity drizzle rain" || "drizzle rain")) {
                    setImage(drizzle);
                    document.body.style.backgroundColor = '#e0e8ca';
                } else if (response.data.weather[0].description === ("heavy intensity drizzle rain" || "shower rain and drizzle" || "heavy shower rain and drizzle" || "shower drizzle")) {
                    setImage(heavyDrizzle);
                    document.body.style.backgroundColor = '#bbbfcb';                    
                } else if (response.data.weather[0].description === ("thunderstorm with light rain" || "thunderstorm with rain" || "thunderstorm with heavy rain" || "thunderstorm with light drizzle" || "thunderstorm with drizzle" || "thunderstorm with heavy drizzle")) {
                    setImage(wetThunderstorm);
                    document.body.style.backgroundColor = '#b1c3d7';
                } else if (response.data.weather[0].description === ("light thunderstorm")) {
                    setImage(lightThunderstorm);
                    document.body.style.backgroundColor = '#a5cce8';
                } else if (response.data.weather[0].description === ("thunderstorm" || "heavy thunderstorm" || "ragged thunderstorm")) {
                    setImage(thunderstorm);
                    document.body.style.backgroundColor = '#357fb5';
                } else if (response.data.weather[0].description === ("light snow" || "Snow" || "Light shower snow")) {
                    setImage(lightSnow);
                    document.body.style.backgroundColor = '#f2fafa';
                } else if (response.data.weather[0].description === ("Sleet" || "Light shower sleet" || "Shower sleet" || "Light rain and snow" || "Rain and snow")) {
                    setImage(wetSnow);
                    document.body.style.backgroundColor = 'b9bbbf';
                } else if (response.data.weather[0].description === ("Heavy snow" || "Shower snow" || "Heavy shower snow")) {
                    setImage(heavySnow);
                    document.body.style.backgroundColor = '#8267a9';
                } else if (response.data.weather[0].description === ("mist" || "Smoke" || "Haze" || "sand/ dust whirls" || "fog" || "sand" || "dust" || "volcanic ash")) {
                    setImage(mist);
                    document.body.style.backgroundColor = 'bcc9bb';
                } else if (response.data.weather[0].description === ("squalls")) {
                    setImage(squalls);
                    document.body.style.backgroundColor = '#9da8b9';
                } else if (response.data.weather[0].description === ("tornado")) {
                    setImage(tornado);
                    document.body.style.backgroundColor = '#a5b2c7';
                }
                console.log(response);
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

    function getCurrentDate(arg){
        if (arg === "currentDate") {
            let month = new Date().toLocaleString("en-US", { month: "long" });
            let day = new Date().toLocaleString("en-US", { day : '2-digit'});
            return `${month} ${day}`;
        } else if (arg === "currentDay") {
            let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            let dateValue = new Date();
            let dayNumber = dateValue.getDay();
            return days[dayNumber];
        }       
            return "";
    }

    function getSunsetTime(milliseconds) {
        if (milliseconds === 0) {
            return "-:-";
        }
        let n = milliseconds + 43200000 + timezone;
        let date = new Date(n);
        let hour = date.getHours();
        let minute = date.getMinutes();
       return `${hour}:${minute}`;

    }

    function getSunriseTime(milliseconds) {
        if (milliseconds === 0) {
            return "-:-";
        }
        let n = milliseconds + timezone;
        let date = new Date(n);
        let hour = date.getHours();
        let minute = date.getMinutes();
       return `${hour}:${minute}`;
    }

    



    return (
    <div className="app__container">
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

        {temperature && (
            <div className="app__info-container info">
            <section className="info__main main-info">
                {city && (
                    <p className="main-info__city">{city}</p>
                    )
                }
                <p className="main-info__date">{getCurrentDate('currentDate')}</p>
                <p className="main-info__day">{getCurrentDate('currentDay')}</p>
                <img className="main-info__image" src={image} alt="weather image"/>
                <div className="main-info__weather">
                    <p className="main-info__temperature">{Math.round(temperature)}°</p>
                    <p className="main-info__descr">{description}</p>
                </div> 

            </section>

            <section className="info__other other-info">
                <div className="other-info__column">
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={sunriseIcon} alt="Sunrise icon"/>
                        <p className="other-info__sunrise other-info__parameter"><span className="other-info__parameter-text text-sunrise">Sunrise: </span>{getSunriseTime(sunrise)}</p>
                    </div>
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={sunsetIcon} alt="Sunset icon"/>
                        <p className="other-info__sunset other-info__parameter"><span className="other-info__parameter-text text-sunset">Sunset:  </span>{getSunsetTime(sunset)}</p>
                    </div>
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={humidityIcon} alt="Humidity icon"/>
                        <p className="other-info__humidity other-info__parameter"><span className="other-info__parameter-text text-humidity">Humidity: </span>{humidity}%</p>
                    </div>                   
                </div>
                <div className="other-info__column">
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={windIcon} alt="Wind icon"/>
                        <p className="other-info__wind other-info__parameter"><span className="other-info__parameter-text text-wind">Wind: </span>{Math.round(wind)} m/s</p>
                    </div>
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={windDirectionIcon} alt="Wind direction icon"/>
                        <p className="other-info__windDirection other-info__parameter"><span className="other-info__parameter-text text-windDirection">Wind direction: </span>{windDirection}</p>
                    </div>
                    <div className="other-info__parameter-container">
                        <img className="other-info__parameter-icon" src={pressureIcon} alt="Atmospheric pressure icon"/>
                        <p className="other-info__pressure other-info__parameter"><span className="other-info__parameter-text text-pressure">Pressure: </span>{Math.round(pressure*0.750064)} mmhg</p>
                    </div>                   
                </div>
                
            </section>
        </div>
        )}
        {!temperature && (
            <p>{message}</p>
        )}
        
    </div>
  );
}

export default App;