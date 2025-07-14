import { WeekSummary } from "../utils/types";
import { SyncLoader } from "react-spinners";

export function FooterSummary({
  summary,
  error,
  locationError,
  location,
}: {
  summary?: WeekSummary | null;
  error?: string | null;
  loading?: boolean;
  locationError?: string | null;
  location?: { lat: number; lon: number } | null;
}) {
  if (!summary)
    return locationError ? (
      <div />
    ) : location ? (
      <div className="flex flex-row items-center justify-center h-full text-xl font-semibold">
        <span className="block font-semibold text-xl mb-2 mr-3">
          Fetching summary
        </span>
        <SyncLoader color="#F3F4F6" size={6} />
      </div>
    ) : null;

  if (error)
    return (
      <div className="flex flex-1 items-center justify-center h-full text-xl font-semibold text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="flex flex-nowrap gap-x-8 gap-y-2 items-center justify-center min-w-max">
      <span title="Average pressure this week" className="whitespace-nowrap">
        Avg. pressure:{" "}
        <span className="font-bold" style={{ fontSize: "2.5rem" }}>
          <span className="text-2xl sm:text-[2.5rem]">
            {summary.average_pressure.toFixed(1)} hPa
          </span>
        </span>
      </span>
      <span title="Min temperature this week" className="whitespace-nowrap">
        Min temperature:{" "}
        <span className="font-bold" style={{ fontSize: "2.5rem" }}>
          <span className="text-2xl sm:text-[2.5rem]">
            {summary.min_temperature_in_week}°C
          </span>
        </span>
      </span>
      <span title="Max temperature this week" className="whitespace-nowrap">
        Max temperature:{" "}
        <span className="font-bold" style={{ fontSize: "2.5rem" }}>
          <span className="text-2xl sm:text-[2.5rem]">
            {summary.max_temperature_in_week}°C
          </span>
        </span>
      </span>
      <span
        title="Average sun exposure this week"
        className="whitespace-nowrap"
      >
        Avg. sun exposure:{" "}
        <span className="font-bold" style={{ fontSize: "2.5rem" }}>
          <span className="text-2xl sm:text-[2.5rem]">
            {summary.average_sun_exposure.toFixed(0)} s
          </span>
        </span>
      </span>
      <span title="Dominant weather this week" className="whitespace-nowrap">
        Precipitation:{" "}
        <span className="font-bold" style={{ fontSize: "2.5rem" }}>
          <span className="text-2xl sm:text-[2.5rem]">
            {summary.rain_information}
          </span>
        </span>
      </span>
    </div>
  );
}
