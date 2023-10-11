import React from "react";
import { formatToLocalTime } from "../service/WeatherService";

interface TimeAndLocationProps {
  weather: Record<string, string>;
}

function TimeAndLocation({ weather }: TimeAndLocationProps) {
  return (
    <div>
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
