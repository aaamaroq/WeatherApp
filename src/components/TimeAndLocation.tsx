import React from "react";
import { formatToLocalTime } from "../service/WeatherService";

/**
 * Propiedades para el componente TimeAndLocation.
 * @interface TimeAndLocationProps
 * @property {Record<string, string>} weather - Datos de tiempo y ubicación.
 */
interface TimeAndLocationProps {
  weather: Record<string, string>;
}

/**
 * Componente que muestra la hora local y la ubicación.
 * @function TimeAndLocation
 * @param {TimeAndLocationProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente de hora y ubicación.
 */
function TimeAndLocation({ weather }: TimeAndLocationProps) {
  return (
    <div className="flex flex-col items-center justify-center text-white drop-shadow-md">
      <div className="flex items-center justify-center my-3">
        <p className="text-xl font-extralight opacity-90">
          {formatToLocalTime(Number(weather.dt), weather.timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="text-5xl font-semibold tracking-tight">
          {`${weather.name}, ${weather.country}`}
        </h2>
      </div>
    </div>
  );
}

export default TimeAndLocation;
