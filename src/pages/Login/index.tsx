import LogoDark from '../../assets/logo-dark.svg'
import Paws from '../../assets/paws.svg'
import {FaEyeSlash} from 'react-icons/fa'
import './Login.scss'
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <img className='paws' src={Paws} alt="" />
      <img className='logo-login' src={LogoDark} alt="" />

      <div className="text">
        <p>Já tem conta? Faça seu login:</p>
      </div>

      <div>
        <form className='form' onSubmit={(e) => e.preventDefault()}>
          <div className='field'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder='Insira seu email'
              id="email"
            />
          </div>
          <div className='field'>
            <label htmlFor="pass">Senha</label>
            <input
              type="password"
              placeholder='Insira sua senha'
              id="pass"
            />
            <FaEyeSlash className='show-pass-icon'/>
          </div>
          <a href="#" className='forget-pass-link'>Esqueci minha senha</a>
          <Link to='/pets'>
            <input className='submit-button' type="submit" value="Entrar" />
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;