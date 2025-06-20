"use client";

import { useEffect, useState } from "react";

import { WeatherDay, WeekSummary } from "./utils/types";
import { getColors } from "./utils/colors";

import { fetchLocationName, fetchWeather, fetchWeekSummary } from "./utils/api";

import { Header } from "./components/Header";
import { WeatherColumn } from "./components/WeatherColumn";
import { FooterSummary } from "./components/FooterSummary";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const [locationName, setLocationName] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherDay[] | null>(null);
  const [weekSummary, setWeekSummary] = useState<WeekSummary | null>(null);

  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weekSummaryError, setWeekSummaryError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const colors = getColors(darkMode);

  const bgMain = colors.main;
  const bgColumn = colors.column;
  const bgFooter = colors.footer;

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
      fetchLocationName(location.lat, location.lon)
        .then(setLocationName)
        .catch((err) => setLocationError(err.message + " Location data"));

      fetchWeather(location.lat, location.lon)
        .then(setWeather)
        .catch((err) => setWeatherError(err.message + " Weather data"));

      fetchWeekSummary(location.lat, location.lon)
        .then(setWeekSummary)
        .catch((err) => setWeekSummaryError(err.message + " Week summary"));
    }
  }, [location]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgMain }}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        locationName={locationName}
        locationError={locationError}
        bgFooter={bgFooter}
      />

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
            <WeatherColumn day={weather?.[i]} error={weatherError} />
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
        <div
          className="w-full overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <FooterSummary
            summary={weekSummary}
            error={weekSummaryError}
            loading={weekSummary == null && !weekSummaryError}
          />
        </div>
      </footer>
    </div>
  );
}
