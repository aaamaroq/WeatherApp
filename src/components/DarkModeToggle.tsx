import React, { useState } from 'react';

/**
 * Componente funcional para alternar entre el modo oscuro y el modo claro.
 * @function DarkModeToggle
 * @returns {JSX.Element} - Elemento JSX que representa el componente.
 */
function DarkModeToggle() {
  // Estado para rastrear si el modo oscuro está habilitado o deshabilitado
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Función para cambiar entre modos claro y oscuro.
   * @function toggleDarkMode
   */
  const toggleDarkMode = () => {
    // Aplicar una transición de clase CSS
    trans();

    // Cambiar el estado de modo oscuro
    setIsDarkMode(!isDarkMode);

    // Actualizar el atributo de tema en el elemento raíz HTML
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  /**
   * Función para aplicar una transición de clase CSS.
   * @function trans
   */
  const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000);
  };

  return (
    <div className={`DarkModeToggle ${isDarkMode ? 'dark' : ''}`}>
      <input
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
}

export default DarkModeToggle;
