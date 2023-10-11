import React from 'react';
import DarkModeToggle from './DarkModeToggle';

/**
 * Componente de encabezado de la aplicación.
 * @function HeadApp
 * @returns {JSX.Element} - Elemento JSX que representa el componente de encabezado.
 */
function HeadApp() {
  return (
    <header>
      <h1>Weather Test</h1>
      <DarkModeToggle />
    </header>
  );
}

export default HeadApp;
