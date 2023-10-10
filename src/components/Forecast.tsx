import React, { FC } from "react";
import { BsFillSunFill } from "react-icons/bs";

interface ForecastProps {
  title: string;
}

function Forecast ({ title }: ForecastProps) {
  return (
    <div>
      <div className="forecast">
        <p>{title}</p>
        <hr />
        <div className="carousel">
          <div>
            <p>04:30 PM</p>
            <BsFillSunFill className="skyImage" />
            <p>22º</p>
          </div>

          <div>
            <p>04:30 PM</p>
            <BsFillSunFill className="skyImage" />
            <p>22º</p>
          </div>

          <div>
            <p>04:30 PM</p>
            <BsFillSunFill className="skyImage" />
            <p>22º</p>
          </div>

          <div>
            <p>04:30 PM</p>
            <BsFillSunFill className="skyImage" />
            <p>22º</p>
          </div>

          <div>
            <p>04:30 PM</p>
            <BsFillSunFill className="skyImage" />
            <p>22º</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
