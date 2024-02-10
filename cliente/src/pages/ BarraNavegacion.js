// BarraNavegacion.js

import React from 'react';
import { Link } from 'react-router-dom';

const BarraNavegacion = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/notificacion">Notificación</Link></li>
        <li><Link to="/notificaciones">Notificaciones</Link></li>
        <li><Link to="/inversiones">Inversiones</Link></li>
      </ul>
    </nav>
  );
}

export default BarraNavegacion;
