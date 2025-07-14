import { useEffect, useState } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  return { location, error };
}
