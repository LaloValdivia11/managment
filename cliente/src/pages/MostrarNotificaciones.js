import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/Oportunidad.css'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const envJSON = require('../env.json');



const MostrasOportunidades = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(envJSON.CATD_SERVER + "/api/oportunidad/obtener/all/notificacion", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const res = await response.json();
        const dataOportunidad = res.data;

        const oportunidadesCombinadas = dataOportunidad.map(elemento => ({
          id: elemento.id,
          descripcion : elemento.descripcion
        }));

        setNotificaciones(oportunidadesCombinadas);


      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

 
  

  return (
    <div>
      <div className="container">
        <h1>Notificaciones user</h1>
        <ul className="opportunity-list">
          {notificaciones.map((oportunidad, index) => (
            <li key={index} className="opportunity-item">
              <span>id:</span>
              <span>{oportunidad.id}</span>
              <span>Notificaciones:</span>
              <span>{oportunidad.descripcion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default MostrasOportunidades;
