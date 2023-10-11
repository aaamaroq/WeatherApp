import { iconUrlFromCode } from "../service/WeatherService";
import { useState } from "react";

interface ForecastProps {
  itemsToday: any;
  itemsWeed: any;
}

function Forecast({ itemsToday, itemsWeed }: ForecastProps) {
  const [activeTab, setActiveTab] = useState("today");

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const items = activeTab === "today" ? itemsToday : itemsWeed;

  return (
    <div>
      <div className="forecast">
        <div>
          <button
            onClick={() => toggleTab("today")}
            className={activeTab === "weed" ? "button_up" : ""}
          >
            <h3>Forecast Today</h3>
          </button>
          <button
            onClick={() => toggleTab("weed")}
            className={activeTab === "today" ? "button_up" : ""}
          >
            <h3>Forecast Weed</h3>
          </button>
        </div>
        <hr />
        <div className="carousel">
          {items.map((item: any) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <img
                src={iconUrlFromCode(item.icon)}
                className="skyImage"
                alt=""
              />
              <p>{`${item.temp.toFixed()}º`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
