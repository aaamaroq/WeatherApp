import { DateTime } from "luxon";

// Importa las imágenes utilizando rutas relativas
import sunImage from '../images/sun.png';
import someCloudsImage from '../images/SomeClouds.png';
import otherCloudsImage from '../images/otherClouds.png';
import aBitRainImage from '../images/aBitRain.png';
import rainImage from '../images/rain.png';
import electricStormImage from '../images/electricStorm.png';
import snowImage from '../images/snow.png';
import fogImage from '../images/fog.png';

// Definir la clave de API y la URL base
const API_KEY: string = "d3f3bdcdfddd816a48b7cbdd6e66b526";
const BASE_URL: string = "https://api.openweathermap.org/data/2.5";

export type Query = { q: string } | { lat: number; lon: number };

// Función para obtener datos meteorológicos
const getWeatherData = (
  infoType: string,
  searchParams: Record<string, any>
): Promise<any> => {
  // Crear una URL con la información del tipo y los parámetros de búsqueda
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({
    ...searchParams,
    units: "metric",
    appid: API_KEY,
  }).toString();

  // Realizar una solicitud fetch y analizar la respuesta como JSON
  return fetch(url.toString()).then((res) => res.json());
};

// Función para formatear los datos meteorológicos actuales
const formatCurrentWeather = (data: any): Record<string, any> => {
  // Desestructurar los datos para extraer la información necesaria

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  // Extraer detalles del estado del tiempo y el icono
  const { main: details, icon } = weather[0];

  // Devolver los datos formateados
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

// Función para formatear los datos del pronóstico meteorológico
const formatForecastWeather = (data: any): Record<string, any> => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// Función para obtener datos meteorológicos formateados
const getFormattedWeatherData = async (
  searchParams: Record<string, any>
): Promise<Record<string, any>> => {
  // Obtener datos meteorológicos actuales y formatearlos
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  // Obtener datos del pronóstico meteorológico y formatearlos
  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
  }).then(formatForecastWeather);

  // Devolver los datos formateados combinados
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Función para formatear la hora local
const formatToLocalTime = (
  secs: number,
  zone: string,
  format: string = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};


const iconUrlFromCode = (code: string) => {
  switch (code) {
    case "01d":
    case "01n":
      return sunImage;
    case "02d":
    case "02n":
      return someCloudsImage;
    case "03d":
    case "03n":
      return otherCloudsImage;
    case "04d":
    case "04n":
      return otherCloudsImage;
    case "09d":
    case "09n":
      return aBitRainImage;
    case "10d":
    case "10n":
      return rainImage;
    case "11d":
    case "11n":
      return electricStormImage;
    case "13d":
    case "13n":
      return snowImage;
    case "50d":
    case "50n":
      return fogImage;
    default:
      return "Descripción no encontrada";
  }
};


export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
