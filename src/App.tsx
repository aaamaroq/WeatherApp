import React, { useEffect, useState } from "react";
import "./style/App.scss";
import HeadApp from "./components/HeaderApp";
import Search from "./components/Search";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./service/WeatherService";

function App() {
  const [query, setQuery] = useState<{ q: string }>({ q: "london" });
  const [weather, setWeather] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Función para obtener y mostrar los datos meteorológicos
    const fetchWeather = async () => {
      // Llamar a la función getFormattedWeatherData con los parámetros de búsqueda
      await getFormattedWeatherData({ ...query }).then((data) => {
        setWeather(data);

      });
    };
    // Llamar a la función para obtener y mostrar los datos meteorológicos de Londres
    fetchWeather();
  }, [query]);

  return (
    <div className="App">
      <HeadApp />
      <Search />

      {weather && (
        <div>
          <TimeAndLocation weather={weather}/>
          <Temperature weather={weather}/>
          <Forecast title="FORECAST TODAY" />
          <Forecast title="FORECAST WEED" />
        </div>
      )}
    </div>
  );
}

export default App;
