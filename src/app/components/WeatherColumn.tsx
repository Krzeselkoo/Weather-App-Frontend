import { weatherCodeImg } from "../utils/weatherCodeImg";
import { formatDate } from "../utils/formatDate";
import { WeatherDay } from "../utils/types";
import { SyncLoader } from "react-spinners";

type WeatherColumnProps = {
  day?: WeatherDay;
  error?: string | null;
};

export function WeatherColumn({ day, error }: WeatherColumnProps) {
  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center h-full text-xl font-semibold text-red-400">
        Error: {error}
      </div>
    );
  }
  if (!day) {
    return (
      <div className="flex flex-1 items-center justify-center h-full flex-row text-xl font-semibold">
        <span className="block font-semibold text-xl mr-3">Fetching data</span>
        <SyncLoader color="#F3F4F6" size={6} />
      </div>
    );
  }
  return (
    <>
      <h3
        className="font-bold w-full block text-4xl mb-2"
        style={{ letterSpacing: "2px" }}
      >
        {formatDate(day.time)}
      </h3>
      <div className="flex flex-col items-center justify-center flex-1">
        {weatherCodeImg(day.weather_code)}
        <span className="block font-semibold text-4xl mt-16">
          {day.temperature_2m_min}°C / {day.temperature_2m_max}°C
        </span>
      </div>
      <div className="mt-2 mb-2">
        <span
          title="Estimated energy production for this day"
          className="block text-lg"
        >
          Est. energy: {day.estimatedEnergy.toFixed(2)} kWh
        </span>
      </div>
    </>
  );
}
