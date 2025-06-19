"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faCloudSun,
  faSnowflake,
  faBoltLightning,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

type WeatherDay = {
  time: string;
  weather_code: number | string;
  temperature_2m_min: number;
  temperature_2m_max: number;
  estimatedEnergy: number;
};

type WeekSummary = {
  average_pressure: number;
  max_temperature_in_week: number;
  min_temperature_in_week: number;
  average_sun_exposure: number;
  rain_information: string;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const [locationName, setLocationName] = useState<string | null>(null);

  const [weather, setWeather] = useState<WeatherDay[] | null>(null);

  const [weekSummary, setWeekSummary] = useState<WeekSummary | null>(null);

  const bgMain = darkMode ? "#5A189A" : "#E0AAFF";
  const bgColumn = darkMode ? "#3C096C" : "#9D4EDD";
  const bgFooter = darkMode ? "#3C096C" : "#9D4EDD";

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address && data.address.city) {
            setLocationName(data.address.city);
          }
        })
        .catch((err) => {
          console.error("Location fetch error:", err);
        });

      fetch(
        `https://weather-app-backend-hkr2.onrender.com/api/weather-forecast?latitude=${location.lat}&longitude=${location.lon}`
      )
        .then((res) => res.json())
        .then(setWeather)
        .catch((err) => {
          console.error("Weather fetch error:", err);
        });

      fetch(
        `https://weather-app-backend-hkr2.onrender.com/api/week-summary?latitude=${location.lat}&longitude=${location.lon}`
      )
        .then((res) => res.json())
        .then(setWeekSummary)
        .catch((err) => {
          console.error("Weekly summary fetch error:", err);
        });
    }
  }, [location]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgMain }}
    >
      <header
        className="p-4 h-40 flex items-center justify-between text-4xl font-bold gap-2"
        style={{
          backgroundColor: bgFooter,
          color: "#F3F4F6",
          textShadow: "0 2px 8px rgba(0,0,0,0.10)",
          letterSpacing: "1px",
        }}
      >
        <div className="flex-1 text-left" />
        <div className="flex-1 text-center">
          Weather for {locationName ? locationName : "your location"}
        </div>
        <div className="flex-1 flex justify-end items-center">
          <button
            className="bg-transparent border-none cursor-pointer mr-8"
            onClick={() => setDarkMode((d) => !d)}
            title="Toggle dark mode"
          >
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} color="#F3F4F6" />
          </button>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 p-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="rounded p-2 text-center mx-auto max-w-xs w-full flex flex-col justify-between h-full transition-transform hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: bgColumn,
              minHeight: "340px",
              color: "#F3F4F6",
              textShadow: "0 2px 8px rgba(0,0,0,0.25)",
            }}
          >
            <h3
              className="font-bold w-full block text-4xl mb-2"
              style={{ letterSpacing: "2px" }}
            >
              {weather && weather[i] && formatDate(weather[i].time)}
            </h3>
            <div className="flex flex-col items-center justify-center flex-1">
              {weather && weather[i] && weatherCodeImg(weather[i].weather_code)}
              {weather && weather[i] && (
                <span className="block font-semibold text-4xl mt-16">
                  {weather[i].temperature_2m_min}°C /{" "}
                  {weather[i].temperature_2m_max}°C
                </span>
              )}
            </div>
            <div className="mt-2 mb-2">
              {weather && weather[i] && (
                <span
                  title="Estimated energy production for this day"
                  className="block text-lg"
                >
                  Est. energy: {weather[i].estimatedEnergy.toFixed(0)} kWh
                </span>
              )}
            </div>
          </div>
        ))}
      </main>
      <footer
        className="p-4 text-center h-40 flex flex-col items-center justify-center text-lg gap-2 relative"
        style={{
          backgroundColor: bgFooter,
          color: "#F3F4F6",
          textShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        {weekSummary ? (
          <div
            className="w-full overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-nowrap gap-x-8 gap-y-2 items-center justify-center min-w-max">
              <span className="whitespace-nowrap">
                Avg. pressure:{" "}
                <span className="font-bold" style={{ fontSize: "2.5rem" }}>
                  <span className="text-2xl sm:text-[2.5rem]">
                    {weekSummary.average_pressure.toFixed(1)} hPa
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap">
                Min temperature:{" "}
                <span className="font-bold" style={{ fontSize: "2.5rem" }}>
                  <span className="text-2xl sm:text-[2.5rem]">
                    {weekSummary.min_temperature_in_week}°C
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap">
                Max temperature:{" "}
                <span className="font-bold" style={{ fontSize: "2.5rem" }}>
                  <span className="text-2xl sm:text-[2.5rem]">
                    {weekSummary.max_temperature_in_week}°C
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap">
                Avg. sun exposure:{" "}
                <span className="font-bold" style={{ fontSize: "2.5rem" }}>
                  <span className="text-2xl sm:text-[2.5rem]">
                    {weekSummary.average_sun_exposure.toFixed(0)} s
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap">
                Precipitation:{" "}
                <span className="font-bold" style={{ fontSize: "2.5rem" }}>
                  <span className="text-2xl sm:text-[2.5rem]">
                    {weekSummary.rain_information}
                  </span>
                </span>
              </span>
            </div>
          </div>
        ) : (
          <div>Loading weekly summary...</div>
        )}
      </footer>
    </div>
  );
}

function formatDate(dateStr: string) {
  const [, month, day] = dateStr.split("-");

  return `${day}/${month}`;
}

function weatherCodeImg(code: number | string) {
  const numCode = typeof code === "string" ? parseInt(code) : code;
  const size = "8x";

  if (numCode === 0) {
    return <FontAwesomeIcon icon={faSun} size={size} color="#fff" />;
  }
  if ([1, 2, 3].includes(numCode)) {
    return <FontAwesomeIcon icon={faCloudSun} size={size} color="#fff" />;
  }
  if ((numCode >= 50 && numCode <= 68) || [80, 81, 82].includes(numCode)) {
    return <FontAwesomeIcon icon={faCloudRain} size={size} color="#fff" />;
  }
  if ((numCode >= 70 && numCode <= 78) || [85, 86].includes(numCode)) {
    return <FontAwesomeIcon icon={faSnowflake} size={size} color="#fff" />;
  }
  if (numCode >= 95) {
    return <FontAwesomeIcon icon={faBoltLightning} size={size} color="#fff" />;
  }

  return <FontAwesomeIcon icon={faCloudSun} size={size} color="#fff" />;
}
