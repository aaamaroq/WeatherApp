// Definir la clave de API y la URL base
const API_KEY: string = "d3f3bdcdfddd816a48b7cbdd6e66b526";
const BASE_URL: string = "https://api.openweathermap.org/data/2.5";

// Función para obtener datos meteorológicos
const getWeatherData = (
  infoType: string,
  searchParams: Record<string, any>
): Promise<any> => {
  // Crear una URL con la información del tipo y los parámetros de búsqueda
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({
    ...searchParams,
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
      temp: d.temp.day,
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
    exclude: 'current,minutely,alerts'
  }).then(formatForecastWeather);

  // Devolver los datos formateados combinados
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// Función para formatear la hora local
const formatToLocalTime = (
  secs: number,
  zone: string,
  format: string = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
): string => {
  const date = new Date(secs * 1000); // Multiplicamos por 1000 para convertir de segundos a milisegundos
  const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: zone,
  };
  return date.toLocaleDateString(undefined, options);
};


const iconUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode }
