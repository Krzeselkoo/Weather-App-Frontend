import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { SyncLoader } from "react-spinners";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  location: { lat: number; lon: number } | null;
  locationName: string | null;
  locationError: string | null;
  locationNameError: string | null;
  bgFooter: string;
}

export function Header({
  darkMode,
  setDarkMode,
  location,
  locationName,
  locationError,
  locationNameError,
  bgFooter,
}: HeaderProps) {
  return (
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
        {locationError ? (
          <span className="text-red-400">
            {locationError.toLowerCase().includes("denied")
              ? "Location access denied. Please allow location to see weather data."
              : `Error: ${locationError}`}
          </span>
        ) : locationNameError ? (
          <span className="text-red-400">
            Failed to get location name from API.
          </span>
        ) : locationName ? (
          <>Weather in {locationName}</>
        ) : location ? (
          <div className="flex items-center justify-center">
            <span className="inline-block font-semibold text-400 mr-3">
              Fetching location data
            </span>
            <SyncLoader color="#F3F4F6" size={8} />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="inline-block font-semibold text-400 mr-3">
              Waiting for location
            </span>
            <SyncLoader color="#F3F4F6" size={8} />
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-end items-center">
        <button
          className="bg-transparent border-none cursor-pointer mr-8"
          onClick={() => setDarkMode((d) => !d)}
          title="Toggle dark mode"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} color={"#F3F4F6"} />
        </button>
      </div>
    </header>
  );
}
