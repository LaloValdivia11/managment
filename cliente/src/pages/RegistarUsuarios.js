import React, { useState } from "react";
import '../css/RegistroForm.css'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const envJSON = require('../env.json');

function RegisterForm() {
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    LastName: "",
    Address: "",
    Email: "",
    Password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);
    const response = await fetch(envJSON.CATD_SERVER + '/api/user/registrar/usuario',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: formData.Name,
        Age: formData.Age,
        LastName : formData.LastName,
        Address : formData.Address,
        Email : formData.Email,
        Password : formData.Password
      })
    })
    const text = await response.text();
    const json = JSON.parse(text)
    if (response.status){
      MySwal.fire({
        title: 'Correcto',
        text: 'Usuario registrado',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
  
  };

  return (
    <div className="register-form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default RegisterForm;