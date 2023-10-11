import React, { useState } from "react";
import { Query } from "../service/WeatherService";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Modal from 'react-modal';

// Corrección en la interfaz SearchProps
interface SearchProps {
  setQuery: (query: Query) => void;
}

function Search({ setQuery }: SearchProps) {
  const [city, setCity] = useState<string>("");

  // Función para manejar el clic en la búsqueda
  const handleSearchClick = () => {
    if (city !== "") {
      // Llamamos a setQuery pasando un objeto con la propiedad 'q'
      setQuery({ q: city });
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div >
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className="icon" onClick={handleSearchClick} />
        <FaLocationDot className="icon" onClick={handleLocationClick} />
      </div>


      <div>
      <button onClick={abrirModal}>Abrir Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal}
        contentLabel="Ejemplo de Modal"
      >
        <h2>Mi Modal</h2>
        <p>Contenido del modal...</p>
        <button onClick={cerrarModal}>Cerrar Modal</button>
      </Modal>
    </div>

    </div>
  );
}

export default Search;
