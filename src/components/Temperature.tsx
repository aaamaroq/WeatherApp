import React from "react";
import { BsFillSunFill, BsSunsetFill } from "react-icons/bs";
import { FaTemperatureFull } from "react-icons/fa6";
import { GiWaterDrop } from "react-icons/gi";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { formatToLocalTime, iconUrlFromCode } from "../service/WeatherService";

interface WeatherDetailsProps {
  weather: Record<string, any>;
}

function WeatherDetails({ weather }: WeatherDetailsProps) {
  console.log(weather.icon)
  return (
    <div className="weatherDetails">
      <div className="skyclimate">
        <p>{weather.details}</p>
      </div>
      <div className="actualTemperature">
        <img className="skyImage" src={iconUrlFromCode(weather.icon)} alt=""/>
        <p>{`${weather.temp.toFixed()}º`}</p>
        <div className="details">
          <div>
            <FaTemperatureFull />
            Real fell:
            <span>{`${weather.feels_like.toFixed()}º`}</span>
          </div>

          <div>
            <GiWaterDrop />
            Humidty:
            <span>{`${weather.humidity.toFixed()}%`}</span>
          </div>

          <div>
            <FaTemperatureFull />
            Wind:
            <span>{`${weather.speed.toFixed()}km/h`}</span>
          </div>
        </div>
      </div>

      <div className="todayTemperature">
        <BsFillSunFill />
        <p>
          Rise: <span>{formatToLocalTime(weather.sunrise,weather.timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <BsSunsetFill />
        <p>
          Set: <span>07:35 PM</span>
        </p>
        <p>|</p>

        <BiUpArrowAlt />
        <p>
          High: <span>45º</span>
        </p>
        <p>|</p>

        <BiDownArrowAlt />
        <p>
          Low: <span>40º</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherDetails;