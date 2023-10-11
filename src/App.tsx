import React, { useEffect, useState } from "react";
import "./style/App.scss";
import HeadApp from "./components/HeaderApp";
import Search from "./components/Search";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./service/WeatherService";
import { queryData } from "./service/WeatherService";

/**
 * Componente principal de la aplicación que muestra información meteorológica.
 * @function App
 * @returns {JSX.Element} - Elemento JSX que representa la aplicación.
 */
function App() {
  const [query, setQuery] = useState<queryData>({ q: "" });
  const [weather, setWeather] = useState<Record<string, any> | null>(null);

  /**
   * Efecto secundario que se ejecuta cuando cambia la propiedad query.
   * Realiza una consulta para obtener datos meteorológicos y actualiza el estado con los datos.
   * @function useEffect
   */
  useEffect(() => {
    // Función para obtener y mostrar los datos meteorológicos
    const fetchWeather = async () => {
      try {
        console.log("Hago una consulta");
        // Llamar a la función getFormattedWeatherData con los parámetros de búsqueda
        const data = await getFormattedWeatherData({ ...query });
        setWeather(data);
      } catch (error) {
        setWeather(null);
      }
    };

    // Llamar a la función para obtener y mostrar los datos meteorológicos de Londres
    fetchWeather();
  }, [query]);

  return (
    <div className="reactApp">
      <HeadApp />
      <Search setQuery={setQuery} weather={weather} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <Temperature weather={weather} />
          <Forecast itemsToday={weather.hourly} itemsWeed={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
