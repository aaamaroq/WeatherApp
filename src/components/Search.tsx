import React, { useState, useEffect, useRef } from "react";
import { queryData } from "../service/WeatherService";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import WeatherModal from "./WeatherModal";

/**
 * Propiedades para el componente Search.
 * @interface SearchProps
 * @property {Function} setQuery - Función para establecer la consulta de datos meteorológicos.
 * @property {Record<string, any> | null} weather - Datos meteorológicos o null si no se encontraron.
 */
interface SearchProps {
  setQuery: (query: queryData) => void;
  weather: Record<string, any> | null;
}

/**
 * Componente que permite buscar información meteorológica por ciudad o ubicación.
 * @function Search
 * @param {SearchProps} props - Propiedades del componente.
 * @returns {JSX.Element} - Elemento JSX que representa el componente de búsqueda.
 */
function Search({ setQuery, weather }: SearchProps) {
  const [city, setCity] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [count, setCount] = useState<number>(1);
  const [title, setTitle] = useState<string>(" ");
  const [description, setDescription] = useState<string>(" ");
  const didMountRef = useRef(false); // Referencia para la primera renderización

  /**
   * Maneja el evento de clic en el botón de búsqueda.
   * Si la ciudad no está vacía, llama a la función setQuery para realizar la búsqueda.
   * @function handleSearchClick
   */
  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  /**
   * Maneja el evento de tecla presionada en el campo de entrada.
   * Si la tecla presionada es "Enter", llama a triggerClick para realizar la búsqueda.
   * @function handleKeyDown
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Evento de tecla presionada.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerClick(() => handleSearchClick());
    }
  };

  /**
   * Maneja el evento de clic en el botón de ubicación.
   * Obtiene la ubicación actual del usuario y llama a setQuery con las coordenadas.
   * @function handleLocationClick
   */
  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      setQuery({
        lat: lat,
        lon: lon,
      });
    });
  };

  /**
   * Dispara una acción después de realizar un cierto número de clics.
   * Si se supera el límite de clics (5), muestra un mensaje en el modal, de lo contrario, realiza la acción proporcionada.
   * @function triggerClick
   * @param {Function} action - Acción a realizar.
   */
  const triggerClick = (action: () => void) => {
    setCount(count + 1);
    console.log(count);
    if (count > 5) {
      setTitle("Upsss!");
      setDescription(
        "Oops! It seems you have used up your 5 free weather queries. Don't worry! Subscribe now and enjoy unlimited queries. 🚀"
      );
      openModal();
    } else {
      action();
    }
  };

  /**
   * Efecto secundario que se ejecuta cuando se actualiza la propiedad weather.
   * Muestra un mensaje en el modal si los datos meteorológicos son nulos (no se encontraron datos).
   * @function useEffect
   */
  useEffect(() => {
    if (didMountRef.current && weather === null) {
      setTitle("Oh no!");
      setDescription(
        "We're sorry, but we couldn't find the requested place. Please check if it has been typed correctly. The next query will go better! 💪"
      );
      openModal();
    } else {
      didMountRef.current = true;
    }
  }, [weather]);

  /**
   * Abre el modal de información.
   * @function openModal
   */
  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="lightMode">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className="icon"
          onClick={() => triggerClick(() => handleSearchClick())}
        />
        <FaLocationDot
          className="icon"
          onClick={() => triggerClick(() => handleLocationClick())}
        />
      </div>

      <WeatherModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        title={title}
        description={description}
      />
    </div>
  );
}

export default Search;
