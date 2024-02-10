import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/Oportunidad.css'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const envJSON = require('../env.json');



const InversionesUsuario = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(envJSON.CATD_SERVER + "/api/oportunidad/inversiones/1", {
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
          nombre : elemento.nameUsuario,
          dinero : elemento.Inversion,
          Oportunidad : elemento.fkOportunidadUsuario,
          fkUser : elemento.fkUser

        }));

        setNotificaciones(oportunidadesCombinadas);


      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);

  const handleEliminar = async (id) => {
    try {
      const MySwal = withReactContent(Swal);
      const response = await fetch(envJSON.CATD_SERVER + `/api/oportunidad/retirar/inversion/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const res = await response.json();

      if(res.status == 200){
        MySwal.fire({
          title: 'Correcto',
          text: 'Inversion realizada',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }



    
    } catch (error) {
      console.error('Error fetching resource:', error);
    }

  };
  

  return (
    <div>
      <div className="container">
        <h1>Lista de Oportunidades</h1>
        <ul className="opportunity-list">
          {notificaciones.map((inversion, index) => (
            <li key={index} className="opportunity-item">
              <span>ID:</span>
              <span>{inversion.id}</span>
              <span>User:</span>
              <span>{inversion.nombre}</span>
              <span>Oportunidad:</span>
              <span>{inversion.Oportunidad}</span>
              <span>Inversion:</span>
              <span>{inversion.dinero}</span>
              <span>fkUser:</span>
              <span>{inversion.fkUser}</span>
              <button onClick={() => handleEliminar(inversion.id)} style={{ fontSize: '0.7em', padding: '0.1em 0.3em' , width: '50px' }}>Agregar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default InversionesUsuario;
