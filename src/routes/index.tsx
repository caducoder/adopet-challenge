import { Routes, Route } from "react-router-dom";
import Welcomepage from "../pages/Welcomepage";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Welcomepage />} />
    </Routes>
  );
}

export default Rotas;