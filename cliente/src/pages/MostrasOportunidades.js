import React, { useState, useEffect } from 'react';
import axios from 'axios'

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
        const response = await fetch(envJSON.CATD_SERVER + "/api/oportunidad/obtener/inversiones", {
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

        // Inicializar el estado de las cantidades con un valor predeterminado para cada oportunidad
        const initialCantidades = {};
        oportunidadesCombinadas.forEach(oportunidad => {
          initialCantidades[oportunidad.id] = 1; // Inicializar cada cantidad con 1
        });
        setCantidades(initialCantidades);

      } catch (error) {
        console.error(error);
      }
    };
    const mostrarOportunidadesUsuario = async () =>{
      const response = await axios.get(envJSON.CATD_SERVER + '/api/oportunidad/obtener/inversiones/usuario/2');

      if(response.status == 200){
       
        setOportunidadesUsuario(response.data);
      }
        
    }

    fetchData();
    mostrarOportunidadesUsuario();
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

  

  return (
    <div>
      <div className="container">
        <h1>Lista de Oportunidades</h1>
        <ul className="opportunity-list">
          {oportunidades.map((oportunidad, index) => (
            <li key={index} className="opportunity-item">
              <span>ID:</span>
              <span>{oportunidad.id}</span>
              <span>Nombre:</span>
              <span>{oportunidad.nombre}</span>
              <span>Inversion</span>
              <span style={{color: "green"}}> $ {oportunidad.amount}</span>

              <button onClick={() => handleAgregarOportunidad(oportunidad.id)} style={{ fontSize: '0.7em', padding: '0.1em 0.3em' , width: '50px' }}>Agregar</button>
              <input
                type="number"
                value={cantidades[oportunidad.id] || 1}
                onChange={(event) => handleChangeCantidad(oportunidad.id, event)}
                style={{ marginLeft: '0.5em', width: '50px' }} // Estilos para el input
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

export default MostrasOportunidades;
