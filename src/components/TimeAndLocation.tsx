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
        <p>{`${weather.name}, ${weather.country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
