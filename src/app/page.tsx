"use client";

import { useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import { useFetch } from "./hooks/useFetch";

import { getColors } from "./utils/colors";

import { fetchLocationName, fetchWeather, fetchWeekSummary } from "./utils/api";

import { Header } from "./components/Header";
import { WeatherColumn } from "./components/WeatherColumn";
import { FooterSummary } from "./components/FooterSummary";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const colors = getColors(darkMode);

  const bgMain = colors.main;
  const bgColumn = colors.column;
  const bgFooter = colors.footer;

  const { location, error: locationError } = useGeolocation();

  const { data: locationName, error: locationNameError } = useFetch(
    location,
    fetchLocationName,
    "Location data"
  );

  const { data: weather, error: weatherError } = useFetch(
    location,
    fetchWeather,
    "Weather data"
  );

  const { data: weekSummary, error: weekSummaryError } = useFetch(
    location,
    fetchWeekSummary,
    "Week summary"
  );

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgMain }}
    >
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        location={location}
        locationName={locationName}
        locationError={locationError}
        locationNameError={locationNameError}
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
            <WeatherColumn
              day={weather?.[i]}
              error={weatherError}
              locationError={locationError}
              location={location}
            />
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
            locationError={locationError}
            location={location}
          />
        </div>
      </footer>
    </div>
  );
}
