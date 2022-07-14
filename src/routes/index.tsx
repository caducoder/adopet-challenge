import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='cadastro' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default Rotas;