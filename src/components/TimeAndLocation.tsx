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
    <div className="lightMode">
      <div className="time">
        <p>{formatToLocalTime(Number(weather.dt), weather.timezone)}</p>
      </div>
      <div className="location">
        <h1>{`${weather.name}, ${weather.country}`}</h1>
      </div>
    </div>
  );
}

export default TimeAndLocation;
