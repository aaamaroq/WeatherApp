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
    <div className="weatherDetails">
      <div className="skyclimate">
        <p>{weather.details}</p>
      </div>
      <div className="actualTemperature">
        <img className="skyImage" src={iconUrlFromCode(weather.icon)} alt="" />
        <p>{`${weather.temp.toFixed()}º`}</p>
        <div className="details">
          <div>
            <FaTemperatureFull />
            Real fell:
            <span>{`${weather.feels_like.toFixed()}º`}</span>
          </div>

          <div>
            <GiWaterDrop />
            Humidity:
            <span>{`${weather.humidity.toFixed()}%`}</span>
          </div>

          <div>
            <BiWind />
            Wind:
            <span>{`${weather.speed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>

      <div className="todayTemperature">
        <BsFillSunFill />
        <p>
          Rise: <span>{formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <BsSunsetFill />
        <p>
          Set: <span>{formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <BiUpArrowAlt />
        <p>
          High: <span>{formatToLocalTime(weather.temp_max, weather.timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <BiDownArrowAlt />
        <p>
          Low: <span>{formatToLocalTime(weather.temp_min, weather.timezone, "hh:mm a")}</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;
