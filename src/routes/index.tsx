import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Message from "../pages/Message";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/cadastro' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/pets' element={<Home />} />
      <Route path='/mensagem' element={<Message />} />
      <Route path='/perfil' element={<Profile />} />
    </Routes>
  );
}

export default Rotas;