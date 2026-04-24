import React from "react";
import { formatToLocalTime, getWeatherIconComponent } from "../service/WeatherService";
import SunriseIcon from "./icons/ui/SunriseIcon";
import SunsetIcon from "./icons/ui/SunsetIcon";
import TemperatureIcon from "./icons/ui/TemperatureIcon";
import HumidityIcon from "./icons/ui/HumidityIcon";
import WindIcon from "./icons/ui/WindIcon";
import ArrowUpIcon from "./icons/ui/ArrowUpIcon";
import ArrowDownIcon from "./icons/ui/ArrowDownIcon";

/**
 * Propiedades para el componente WeatherDetails.
 * @interface WeatherDetailsProps
 * @property {Record<string, any>} weather - Datos meteorológicos.
 */
interface WeatherDetailsProps {
  weather: Record<string, any>;
}

/**
 * Componente que muestra los detalles del tiempo, incluyendo información como la temperatura, el estado del tiempo y otros datos relevantes.
 * @function WeatherDetails
 * @param {WeatherDetailsProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente de detalles del tiempo.
 */
function WeatherDetails({ weather }: WeatherDetailsProps) {
  const WeatherIcon = getWeatherIconComponent(weather.icon);

  return (
    <div className="glass-card p-6 flex flex-col items-center justify-between h-full text-white">
      <div className="text-center w-full">
        <p className="text-xl font-medium tracking-widest text-white/70 uppercase">
          {weather.details}
        </p>
      </div>

      <div className="flex items-center justify-between w-full my-6">
        <WeatherIcon className="w-24 h-24 drop-shadow-md text-white" />
        <p className="text-6xl font-bold tracking-tighter">
          {`${weather.temp.toFixed()}º`}
        </p>
        <div className="flex flex-col space-y-2 text-sm font-light">
          <div className="flex items-center gap-2">
            <TemperatureIcon className="w-[18px] h-[18px] text-white/60" />
            Feels like: <span className="font-semibold">{`${weather.feels_like.toFixed()}º`}</span>
          </div>
          <div className="flex items-center gap-2">
            <HumidityIcon className="w-[18px] h-[18px] text-white/60" />
            Humidity: <span className="font-semibold">{`${weather.humidity.toFixed()}%`}</span>
          </div>
          <div className="flex items-center gap-2">
            <WindIcon className="w-[18px] h-[18px] text-white/60" />
            Wind: <span className="font-semibold">{`${weather.speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
        <div className="flex flex-col items-center gap-1">
          <SunriseIcon className="w-5 h-5 text-yellow-400" />
          <p className="text-xs text-white/60 uppercase">Rise</p>
          <p className="text-sm font-medium">{formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <SunsetIcon className="w-5 h-5 text-orange-400" />
          <p className="text-xs text-white/60 uppercase">Set</p>
          <p className="text-sm font-medium">{formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowUpIcon className="w-5 h-5 text-white/80" />
          <p className="text-xs text-white/60 uppercase">High</p>
          <p className="text-sm font-medium">{`${weather.temp_max.toFixed()}º`}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowDownIcon className="w-5 h-5 text-white/80" />
          <p className="text-xs text-white/60 uppercase">Low</p>
          <p className="text-sm font-medium">{`${weather.temp_min.toFixed()}º`}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
