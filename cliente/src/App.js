import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import Login from './pages/Login';
import Oportunidad from './pages/MostrasOportunidades';
import Registro from './pages/RegistarUsuarios'
import Notificacion from './pages/MostarNotificacion';
import Notificaciones from './pages/MostrarNotificaciones';
import Inversion from './pages/InversionesUsuario';

function App() {
  return (
    <Router>
     
      <Routes> {/* Wrap Route components with Routes */}
        <Route path="/login" element={<Login />} />  
        <Route path="/home" element={<Oportunidad />} /> 
        <Route path="/registro" element={<Registro/>} /> 
        <Route path="/notificacion" element={<Notificacion/>} /> 
        <Route path="/notificaciones" element={<Notificaciones/>} /> 
        <Route path="/inversiones" element={<Inversion/>} /> 
      </Routes>
      
    </Router>
  );
}

export default App;
