import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='cadastro' element={<Register />} />
    </Routes>
  );
}

export default Rotas;