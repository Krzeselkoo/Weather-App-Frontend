export type WeekSummary = {
  average_pressure: number;
  max_temperature_in_week: number;
  min_temperature_in_week: number;
  average_sun_exposure: number;
  rain_information: string;
};

export type WeatherDay = {
  time: string;
  weather_code: number | string;
  temperature_2m_min: number;
  temperature_2m_max: number;
  estimatedEnergy: number;
};
