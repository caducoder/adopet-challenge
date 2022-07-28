import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Rotas from './routes';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer 
      position={"bottom-right"}
      pauseOnFocusLoss
    />
      <Header />
      <main>
        <Rotas />
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
