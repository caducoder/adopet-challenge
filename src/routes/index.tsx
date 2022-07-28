import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Message from "../pages/Message";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

function Rotas() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Welcome />} />
        <Route path='cadastro' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='pets' element={<Home />} />
          <Route path='mensagem' element={<Message />} />
          <Route path='perfil' element={<Profile />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Rotas;