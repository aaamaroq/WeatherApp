import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeadApp from "./components/HeaderApp";
import Search from "./components/Search";
import TimeAndLocation from "./components/TimeAndLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import Atmosphere from "./components/Atmosphere";
import getFormattedWeatherData from "./service/WeatherService";
import { queryData } from "./service/WeatherService";

function App() {
  const [query, setQuery] = useState<queryData>({ q: "London" });
  const [weather, setWeather] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData({ ...query });
        setWeather(data);
      } catch (error) {
        setWeather(null);
      }
    };
    fetchWeather();
  }, [query]);

  // Dynamic background classes based on weather
  const getBackgroundClass = () => {
    if (!weather) return "from-sky-clear-start to-sky-clear-end";
    const condition = weather.details;
    const isNight = weather.icon?.includes('n');

    if (isNight) return "from-sky-dark-start to-sky-dark-end";
    if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") return "from-slate-700 to-slate-900";
    if (condition === "Clouds") return "from-blue-400 to-slate-500";
    return "from-sky-clear-start to-sky-clear-end";
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 bg-gradient-to-b ${getBackgroundClass()} overflow-x-hidden relative`}>
      <Atmosphere weather={weather} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeadApp />
          <Search setQuery={setQuery} weather={weather} />
        </motion.div>

        <AnimatePresence mode="wait">
          {weather && (
            <motion.div
              key={weather.name + weather.dt}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6 mt-8"
            >
              <TimeAndLocation weather={weather} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Temperature weather={weather} />
                <Forecast itemsToday={weather.hourly} itemsWeed={weather.daily} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
