import React, { useEffect, useState } from "react";
import SearchBar from "./WheatherAPI/SearchBar";
import WheatherCard from "./WheatherAPI/WheatherCard";
import HourlyForecast from "./WheatherAPI/HourlyForecast";

const API_KEY = "c9a0ca46550648b29ce125849232709";
const BASE_URL =
  "https://api.weatherapi.com/v1/forecast.json?key=" + API_KEY + "&q=";

type Props = {};

export default function WheatherDisplay({}: Props) {
  const [city, setCity] = useState("Hanoi");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [hourly, setHourly] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const resWheather = await fetch(BASE_URL + city);
        if (!resWheather.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const wheatherData = await resWheather.json();
        console.log(wheatherData);

        const resForecast = await fetch(BASE_URL + city +"&days=1");
        if (!resForecast.ok) {
          throw new Error("Failed to fetch hourly forecast data");
        }
        const forecastData = await resForecast.json();
        console.log("\n" + forecastData);

        setWeather({
          temp: Math.round(wheatherData.current.temp_c),
          condition: wheatherData.current.condition.text,
          icon: "https:" + wheatherData.current.condition.icon,
          humidity: wheatherData.current.humidity,
          wind: wheatherData.current.wind_kph,
        });

        // Get next 4 hours (including now)
        const nowHour = new Date(wheatherData.location.localtime).getHours();
        const hours = forecastData.forecast.forecastday[0].hour;
        const hourlyItems = [];
        for (let i = 0; i < 4; i++) {
          const h = (nowHour + i) % 24;
          const hourData = hours[h];
          hourlyItems.push({
            time: i === 0 ? "Now" : hourData.time.slice(-5),
            temp: Math.round(hourData.temp_c),
            icon: "https:" + hourData.condition.icon,
            isNow: i === 0,
          });
        }
        setHourly(hourlyItems);
      } catch (error) {
        setWeather(null);
        setHourly([]);
      }
      setLoading(false);
    };
    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    setCity(city.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col items-center py-4">
      <div className="w-full max-w-xs mx-auto">
        <SearchBar value={city} onChange={setCity} onSearch={handleSearch} />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            Loading...
          </div>
        ) : weather ? (
          <>
            <WheatherCard
              temp={weather.temp}
              condition={weather.condition}
              icon={weather.icon}
              humidity={weather.humidity}
              wind={weather.wind}
            />
            <HourlyForecast items={hourly} />
          </>
        ) : (
          <div className="text-center text-red-500 mt-8">No data found.</div>
        )}
      </div>
    </div>
  );
}
