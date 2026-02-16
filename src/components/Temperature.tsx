import React from "react";
import { BsFillSunFill, BsSunsetFill } from "react-icons/bs";
import { FaTemperatureFull } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { BiUpArrowAlt, BiDownArrowAlt, BiWind } from "react-icons/bi";
import { formatToLocalTime, iconUrlFromCode } from "../service/WeatherService";

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
  return (
    <div className="glass-card p-6 flex flex-col items-center justify-between h-full text-white">
      <div className="text-center w-full">
        <p className="text-xl font-medium tracking-widest text-white/70 uppercase">
          {weather.details}
        </p>
      </div>

      <div className="flex items-center justify-between w-full my-6">
        <img className="w-24 h-24 drop-shadow-md" src={iconUrlFromCode(weather.icon)} alt="" />
        <p className="text-6xl font-bold tracking-tighter">
          {`${weather.temp.toFixed()}º`}
        </p>
        <div className="flex flex-col space-y-2 text-sm font-light">
          <div className="flex items-center gap-2">
            <FaTemperatureFull size={18} className="text-white/60" />
            Feels like: <span className="font-semibold">{`${weather.feels_like.toFixed()}º`}</span>
          </div>
          <div className="flex items-center gap-2">
            <GiWaterDrop size={18} className="text-white/60" />
            Humidity: <span className="font-semibold">{`${weather.humidity.toFixed()}%`}</span>
          </div>
          <div className="flex items-center gap-2">
            <BiWind size={18} className="text-white/60" />
            Wind: <span className="font-semibold">{`${weather.speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
        <div className="flex flex-col items-center gap-1">
          <BsFillSunFill className="text-yellow-400" />
          <p className="text-xs text-white/60 uppercase">Rise</p>
          <p className="text-sm font-medium">{formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BsSunsetFill className="text-orange-400" />
          <p className="text-xs text-white/60 uppercase">Set</p>
          <p className="text-sm font-medium">{formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BiUpArrowAlt className="text-white/80" />
          <p className="text-xs text-white/60 uppercase">High</p>
          <p className="text-sm font-medium">{`${weather.temp_max.toFixed()}º`}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <BiDownArrowAlt className="text-white/80" />
          <p className="text-xs text-white/60 uppercase">Low</p>
          <p className="text-sm font-medium">{`${weather.temp_min.toFixed()}º`}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
