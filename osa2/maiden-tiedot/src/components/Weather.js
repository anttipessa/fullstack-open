import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({})
    const whook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                console.log(response.data)
                setWeather(response.data.current)
            })
    }
    useEffect(whook, [])
    console.log(weather)
    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p> <b>temperature:</b> {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt="new" width="100" height="50" />
            <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather