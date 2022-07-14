import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
    </Routes>
  );
}

export default Rotas;