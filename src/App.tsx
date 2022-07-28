import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rotas from './routes';

function App() {
  return (
    <>
      <ToastContainer
        position={"bottom-right"}
        pauseOnFocusLoss
      />
      <Routes>
        <Route path='/*' element={<Rotas />} />
      </Routes>
    </>
  )
}

export default App
