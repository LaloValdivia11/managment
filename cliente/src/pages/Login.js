import React, { useState } from 'react';
import '../css/LoginForm.css'; 
import { useNavigate } from 'react-router-dom'; // Importa useNavigate en lugar de useHistory
const envJSON = require('../env.json');

const LoginForm = () => {
  const navigate = useNavigate(); // Usa useNavigate para obtener el objeto de navegación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar los datos del formulario a tu backend

    const response = await fetch(envJSON.CATD_SERVER + '/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email: email,
        Password: password
      })
    })
    const text = await response.text();
    const json = JSON.parse(text)
    if(response.status === 200){
      localStorage.setItem('token', json.token)
      navigate('/home');
    }
  };
  const handleRegistro = async (e) =>{
    navigate('/registro'); 
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        

      </form>
    </div>
  );
};

export default LoginForm;
