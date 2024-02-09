import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

import Login from './pages/Login';
import Oportunidad from './pages/MostrasOportunidades';
import Registro from './pages/RegistarUsuarios'
function App() {
  return (
    <Router>
      <Routes> {/* Wrap Route components with Routes */}
        <Route path="/login" element={<Login />} />  
        <Route path="/home" element={<Oportunidad />} /> 
        <Route path="/registro" element={<Registro/>} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
