import { iconUrlFromCode } from "../service/WeatherService";
import { useState } from "react";

/**
 * Propiedades para el componente Forecast.
 * @interface ForecastProps
 * @property {any} itemsToday - Datos del pronóstico para hoy.
 * @property {any} itemsWeed - Datos del pronóstico para la semana.
 */
interface ForecastProps {
  itemsToday: any;
  itemsWeed: any;
}

/**
 * Componente que muestra un pronóstico del tiempo para hoy o la semana.
 * @function Forecast
 * @param {ForecastProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente Forecast.
 */
function Forecast({ itemsToday, itemsWeed }: ForecastProps) {
  const [activeTab, setActiveTab] = useState("today");

  /**
   * Función para cambiar entre las pestañas "today" y "weed".
   * @function toggleTab
   * @param {string} tab - Pestaña activa ("today" o "weed").
   */
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  // Determinar qué conjunto de datos usar según la pestaña activa.
  const items = activeTab === "today" ? itemsToday : itemsWeed;

  return (
    <div className="lightMode">
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
            <h3>Forecast Week</h3>
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
