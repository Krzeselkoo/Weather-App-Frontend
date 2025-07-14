import { useEffect, useState } from "react";

export function useFetch<T>(
  location: { lat: number; lon: number } | null,
  fetchFunction: (lat: number, lon: number) => Promise<T>,
  errorMessage: string
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      fetchFunction(location.lat, location.lon)
        .then((result) => {
          setData(result);
          setError(null);
        })
        .catch((err) => {
          setError(err.message + " " + errorMessage);
          setData(null);
        });
    }
  }, [location, fetchFunction, errorMessage]);

  return { data, error };
}
