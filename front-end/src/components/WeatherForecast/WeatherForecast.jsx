import { useEffect, useState } from "react";
import { FaCloudSun, FaExclamationTriangle } from "react-icons/fa";
import { useLocationContext } from "../Context/LocationContext";

const WeatherForecast = () => {
    const { location } = useLocationContext();
    const { lat, lon } = location;

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [alerts, setAlerts] = useState([]);

    console.log("Latitude & Longitude:", lat, lon);

    useEffect(() => {
        if (lat && lon) {
            fetchWeatherDetails(lat, lon);
        }
    }, [lat, lon]);

    const fetchWeatherDetails = (lat, lon) => {
        const API_KEY = import.meta.env.VITE_WEATHER_API;
        console.log("API Key:", API_KEY);

        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=3&alerts=yes`;

        fetch(url)
            .then(response => {
                console.log("Raw Response:", response);
                if (!response.ok) {
                    throw new Error("Failed to fetch weather data");
                }
                return response.json();
            })
            .then(data => {
                console.log("Weather Data:", data);
                setWeather(data.current);
                setForecast(data.forecast.forecastday || []);
                setAlerts(data.alerts?.alert || []);
            })
            .catch(error => console.error("Weather API Error:", error));
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6 pt-24 flex flex-col items-center">
            <header className="bg-blue-600 text-white py-4 px-6 text-center w-full">
                <h1 className="text-3xl font-bold">Disaster Prediction</h1>
                <p className="text-lg">Live weather updates and disaster alerts</p>
            </header>

            {weather && (
                <div className="bg-white shadow-md p-6 w-80 rounded-lg mt-6 text-center">
                    <FaCloudSun className="text-yellow-500 text-5xl mx-auto mb-2" />
                    <h2 className="text-2xl font-semibold">Current Weather</h2>
                    <p className="text-lg">{weather.condition.text}, {weather.temp_c}°C</p>
                    <p className="text-gray-700">Wind: {weather.wind_kph} km/h</p>
                </div>
            )}

            <h2 className="text-3xl font-semibold text-center mt-8">3-Day Forecast</h2>
            <div className="flex justify-center gap-6 mt-4 flex-wrap">
                {forecast.length > 0 ? forecast.map((day) => (
                    <div key={day.date} className="bg-white shadow-lg p-6 w-80 rounded-lg text-center">
                        <p className="font-bold text-lg">{day.date}</p>
                        <img src={day.day.condition.icon} alt="Weather icon" className="mx-auto w-16 h-16" />
                        <p className="text-lg">{day.day.condition.text}</p>
                        <p className="text-gray-700 text-lg">Temp: {day.day.avgtemp_c}°C</p>
                    </div>
                )) : <p className="text-center w-full">Loading forecast...</p>}
            </div>

            {alerts.length > 0 && (
                <div className="bg-red-100 p-6 rounded-md mt-6 w-96">
                    <h2 className="text-2xl font-semibold text-red-600 flex items-center">
                        <FaExclamationTriangle className="mr-2" /> Disaster Alerts
                    </h2>
                    {alerts.map((alert, index) => (
                        <div key={index} className="mt-2">
                            <p className="font-bold">{alert.headline}</p>
                            <p>{alert.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;





/*import { useEffect, useState } from "react";
import { FaCloudSun, FaExclamationTriangle } from "react-icons/fa";
import { useLocationContext } from "../Context/LocationContext"; 

const WeatherForecast = () => {
    const { location } = useLocationContext(); 
    const { lat, lon } = location; 

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [alerts, setAlerts] = useState([]);

    console.log("Latitude & Longitude:", lat, lon); 

    useEffect(() => {
        if (lat && lon) {
            fetchWeatherDetails(lat, lon);
        }
    }, [lat, lon]);

    const fetchWeatherDetails = async (lat, lon) => {
        try {
            const API_KEY = import.meta.env.VITE_WEATHER_API;
            console.log("API Key "+API_KEY);
            fetch("https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=13.0220032,80.2029568&days=7&alerts=yes")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

            const url =  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&alerts=yes`;
            const response = await fetch(url);
            console.log("Response "+JSON.stringify(response));
            if (!response.ok) throw new Error("Failed to fetch weather");

            const data = await response.json();
            setWeather(data.current);
            setForecast(data.forecast.forecastday || []);
            setAlerts(data.alerts?.alert || []);
        } catch (error) {
            console.error("Weather API Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 p-6 pt-24">
            <header className="bg-blue-600 text-white py-4 px-6 text-center">
                <h1 className="text-3xl font-bold">Disaster Prediction</h1>
                <p className="text-lg">Live weather updates and disaster alerts</p>
            </header>

            {weather && (
                <div className="bg-white shadow-md p-6 rounded-lg mt-6 text-center">
                    <FaCloudSun className="text-yellow-500 text-4xl mx-auto" />
                    <h2 className="text-xl font-semibold">Current Weather</h2>
                    <p>{weather.condition.text}, {weather.temp_c}°C</p>
                    <p>Wind: {weather.wind_kph} km/h</p>
                </div>
            )}

            <h2 className="text-2xl font-semibold text-center mt-6">7-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mt-4">
                {forecast.length === 7 ? forecast.map((day) => (
                    <div key={day.date} className="bg-white shadow-md p-4 rounded-lg text-center">
                        <p className="font-bold">{day.date}</p>
                        <img src={day.day.condition.icon} alt="Weather icon" className="mx-auto" />
                        <p>{day.day.condition.text}</p>
                        <p>Temp: {day.day.avgtemp_c}°C</p>
                    </div>
                )) : <p className="text-center w-full">Loading forecast...</p>}
            </div>

            {alerts.length > 0 && (
                <div className="bg-red-100 p-4 rounded-md mt-6">
                    <h2 className="text-xl font-semibold text-red-600 flex items-center">
                        <FaExclamationTriangle className="mr-2" /> Disaster Alerts
                    </h2>
                    {alerts.map((alert, index) => (
                        <div key={index} className="mt-2">
                            <p className="font-bold">{alert.headline}</p>
                            <p>{alert.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherForecast;*/