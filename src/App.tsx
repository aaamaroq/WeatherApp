import React, { useEffect, useState } from "react";
import "./style/App.scss";
import HeadApp from "./components/HeaderApp";
import Search from "./components/Search";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./service/WeatherService";
import { Query } from "./service/WeatherService";

function App() {
  const [query, setQuery] = useState<Query>({ q: "" });
  const [weather, setWeather] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Función para obtener y mostrar los datos meteorológicos
    const fetchWeather = async () => {
      try {
        // Llamar a la función getFormattedWeatherData con los parámetros de búsqueda
        const data = await getFormattedWeatherData({ ...query });
        setWeather(data);
      } catch (error) {
        console.error("Error al obtener datos meteorológicos:", error);
        setWeather(null); // Establecer weather en null en caso de error
      }
    };
  
    // Llamar a la función para obtener y mostrar los datos meteorológicos de Londres
    fetchWeather();
  }, [query]);

  
  return (
    <div className="reactApp">
      <HeadApp />
      <Search setQuery={setQuery}/>

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <Temperature weather={weather}/>
          <Forecast itemsToday={weather.hourly} itemsWeed={weather.daily}/>
        </div>
      )}
    </div>
  );
}

export default App;
