import { WeatherDay, WeekSummary } from "./types";

export async function fetchLocationName(
  lat: number,
  lon: number
): Promise<string | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  );
  const data = await res.json();
  if (data && data.address && data.address.city) {
    return data.address.city;
  }
  return null;
}

export async function fetchWeather(
  lat: number,
  lon: number
): Promise<WeatherDay[]> {
  const res = await fetch(
    `https://weather-app-backend-hkr2.onrender.com/api/weather-forecast?latitude=${lat}&longitude=${lon}`
  );
  if (!res.ok) throw new Error("Weather data");
  return res.json();
}

export async function fetchWeekSummary(
  lat: number,
  lon: number
): Promise<WeekSummary> {
  const res = await fetch(
    `https://weather-app-backend-hkr2.onrender.com/api/week-summary?latitude=${lat}&longitude=${lon}`
  );
  if (!res.ok) throw new Error("Week summary");
  return res.json();
}
