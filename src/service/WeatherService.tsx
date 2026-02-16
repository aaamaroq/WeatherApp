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

/**
 * Tipo de datos para parámetros de consulta.
 * @typedef {object} queryData
 * @property {string} q - Consulta por nombre de ciudad.
 * @property {number} lat - Latitud para la búsqueda por coordenadas.
 * @property {number} lon - Longitud para la búsqueda por coordenadas.
 */

// Función para obtener datos meteorológicos.
/**
 * Obtiene datos meteorológicos de la API.
 *
 * @param {string} infoType - Tipo de información meteorológica (por ejemplo, "weather" o "onecall").
 * @param {Object} searchParams - Parámetros de búsqueda para la solicitud.
 * @returns {Promise<any>} - Promesa que resuelve con los datos obtenidos.
 */
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

// Función para formatear los datos meteorológicos actuales.
/**
 * Formatea los datos meteorológicos actuales.
 *
 * @param {Object} data - Datos crudos obtenidos de la API.
 * @returns {Object} - Datos formateados con información relevante.
 */
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

// Función para formatear los datos del pronóstico meteorológico (Standard Forecast API).
const formatForecastWeather = (data: any): Record<string, any> => {
  let { list, city } = data;
  const timezone = city.timezone;

  // Extract hourly (next 5 counts)
  const hourly = list.slice(0, 5).map((d: any) => {
    return {
      title: DateTime.fromSeconds(d.dt).setZone(`UTC${timezone >= 0 ? '+' : ''}${timezone / 3600}`).toFormat("hh:mm a"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  // Extract daily (approximate daily by taking noon entries or one per day)
  const daily = list.filter((d: any) => d.dt_txt.includes("12:00:00")).slice(0, 5).map((d: any) => {
    return {
      title: DateTime.fromSeconds(d.dt).setZone(`UTC${timezone >= 0 ? '+' : ''}${timezone / 3600}`).toFormat("ccc"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

// Función para obtener datos meteorológicos formateados.
const getFormattedWeatherData = async (
  searchParams: Record<string, any>
): Promise<Record<string, any>> => {
  try {
    // Obtener datos meteorológicos actuales
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    try {
      // Intentar obtener pronóstico usando la API estándar (más compatible)
      const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
      }).then(formatForecastWeather);

      return { ...formattedCurrentWeather, ...formattedForecastWeather };
    } catch (forecastError) {
      console.warn("Forecast data could not be loaded:", forecastError);
      // Devolver solo el clima actual si el pronóstico falla
      return { ...formattedCurrentWeather, daily: [], hourly: [] };
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

// Función para formatear la hora local.
/**
 * Formatea un valor de tiempo en segundos en la hora local especificada.
 *
 * @param {number} secs - Valor de tiempo en segundos.
 * @param {string} zone - Zona horaria para la conversión.
 * @param {string} format - Formato de salida (opcional).
 * @returns {string} - Hora local formateada.
 */
const formatToLocalTime = (
  secs: number,
  zone: string,
  format: string = "cccc, dd LLL yyyy' , Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

/**
 * Obtiene la URL de la imagen correspondiente a un código de icono meteorológico.
 *
 * @param {string} code - Código de icono meteorológico.
 * @returns {string} - URL de la imagen.
 */
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

// Exportar la función principal que obtiene datos meteorológicos formateados.
export default getFormattedWeatherData;

// Exportar funciones auxiliares.
export { formatToLocalTime, iconUrlFromCode };

export type queryData = { q: string } | { lat: number; lon: number };