import LogoDark from '../../assets/logo-dark.svg'
import Paws from '../../assets/paws.svg'
import {FaEyeSlash} from 'react-icons/fa'
import './Register.scss'

function Register() {
  return (
    <div className='register-container'>
      <img className='paws' src={Paws} alt="" />
      <img className='logo-register' src={LogoDark} alt="" />
      <div className="text">
        <p>Ainda não tem cadastro?</p>
        <p>
          Então, antes de buscar seu melhor amigo, precisamos de alguns dados:
        </p>
      </div>
      <div className='form-container'>
        <form className='form' action="">
          <div className='field'>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              placeholder='Escolha seu melhor email' 
              id="email" 
            />
          </div>
          <div className='field'>
            <label htmlFor="name">Nome</label>
            <input 
              type="text" 
              placeholder='Digite seu nome completo' 
              id="name"
            />
          </div>
          <div className='field'>
            <label htmlFor="pass">Senha</label>
            <input 
              type="password" 
              placeholder='Crie uma senha' 
              id="pass" 
            />
            <FaEyeSlash className='show-pass-icon'/>
          </div>
          <div className='field'>
            <label htmlFor="confirm-pass">Confirmar sua senha</label>
            <input 
              type="password" 
              placeholder='Repita a senha criada acima' 
              id="confirm-pass" 
            />
            <FaEyeSlash className='show-pass-icon'/>
          </div>
          <input className='submit-button' type="submit" value="Cadastrar" />
        </form>
      </div>
    </div>
  );
}

export default Register;