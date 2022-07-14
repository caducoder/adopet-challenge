import LogoDark from '../../assets/logo-dark.svg'
import Paws from '../../assets/paws.svg'
import {FaEyeSlash} from 'react-icons/fa'
import './Login.scss'

function Login() {
  return (
    <div className="login-container">
      <img className='paws' src={Paws} alt="" />
      <img className='logo-login' src={LogoDark} alt="" />

      <div className="text">
        <p>Já tem conta? Faça seu login:</p>
      </div>

      <div>
        <form className='form' action="">
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

          <input className='submit-button' type="submit" value="Entrar" />
        </form>
      </div>
    </div>
  );
}

export default Login;