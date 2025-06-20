import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  locationName: string | null;
  locationError: string | null;
  bgFooter: string;
}

export function Header({
  darkMode,
  setDarkMode,
  locationName,
  locationError,
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
          <span className="text-red-400">Error: {locationError}</span>
        ) : (
          <>Weather in {locationName ? locationName : "your location"}</>
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
