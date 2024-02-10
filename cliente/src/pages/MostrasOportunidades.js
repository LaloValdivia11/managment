import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../css/Oportunidad.css'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const envJSON = require('../env.json');



const MostrasOportunidades = () => {
  const [oportunidades, setOportunidades] = useState([]);
  const [cantidades, setCantidades] = useState({}); 
  const [oportunidadesUsuario, setOportunidadesUsuario] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(envJSON.CATD_SERVER + "/api/oportunidad/obtener/oportunidades", {
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
          id: elemento.Id,
          nombre: elemento.NameOpportunities,
          amount : elemento.TotalAmount
        }));

        setOportunidades(oportunidadesCombinadas);

        const initialCantidades = {};
        oportunidadesCombinadas.forEach(oportunidad => {
          initialCantidades[oportunidad.id] = 1; 
        });
        setCantidades(initialCantidades);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    
  }, []);

  const handleAgregarOportunidad = async (id) => {
    try {
     const MySwal = withReactContent(Swal);
     var informacion = {
       fkUser : 2,
       id : id,
       amount : cantidades[id]
     }

     const response = await axios.post(envJSON.CATD_SERVER + '/api/oportunidad/realizar/inversion',informacion);
      
      if(response.status == 201){
        MySwal.fire({
          title: 'Error',
          text: 'No cuentas con el dinero suficiente',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else if(response.status == 200){
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

 

  const handleChangeCantidad = (id, event) => {
    const newValue = parseInt(event.target.value);
    setCantidades(prevCantidades => ({
      ...prevCantidades,
      [id]: newValue,
    }));
  };

  // la ruta notificacion es para poder ver la notificacion del usuario 
  //la ruta notificacion es para poder ver todas las rutas del usuario
  // la ruta inversiones es para poder ver tus inversiones y poder retirar tu inversion
  

  return (
    <div>
      <nav>
        <ul className="navigation-menu">
          <li><Link to="/notificacion">Notificación</Link></li>
          <li><Link to="/notificaciones">Notificaciones</Link></li>
          <li><Link to="/inversiones">Inversion</Link></li>
        </ul>
      </nav>
      <div className="container">
        <h1>Lista de Oportunidades</h1>
        <ul className="opportunity-list">
          {oportunidades.map((oportunidad, index) => (
            <li key={index} className="opportunity-item">
              <span>ID:</span>
              <span>{oportunidad.id}</span>
              <span>Nombre:</span>
              <span>{oportunidad.nombre}</span>
              <span>Inversión:</span>
              <span style={{ color: "green" }}> $ {oportunidad.amount}</span>
  
              <button onClick={() => handleAgregarOportunidad(oportunidad.id)} className="add-button">Agregar</button>
              <input
                type="number"
                value={cantidades[oportunidad.id] || 1}
                onChange={(event) => handleChangeCantidad(oportunidad.id, event)}
                className="quantity-input"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  
}

export default MostrasOportunidades;
