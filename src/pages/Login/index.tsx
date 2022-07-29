import { useState } from 'react';
import LogoDark from '../../assets/logo-dark.svg'
import Paws from '../../assets/paws.svg'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup';
import './Login.scss'
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const loginSchemaValidation = Yup.object().shape({
  email: Yup.string().email('email inválido').required('Insira seu email'),
  senha: Yup.string().min(6, 'Mínimo de 6 caracteres').required('Insira sua senha'),
})

function Login() {
  const { authenticate } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (values: { email: string, senha: string }) => {
    setIsLoading(true)
    try {
      await authenticate(values.email, values.senha)
      navigate('/pets')
    } catch (error) {
      toast.error(`Usuário não encontrado`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <img className='paws' src={Paws} alt="" />
      <Link to='/'>
        <img className='logo-login' src={LogoDark} alt="" />
      </Link>

      <div className="text">
        <p>Já tem conta? Faça seu login:</p>
      </div>

      <div className='form-container'>
        <Formik
          initialValues={{
            email: '',
            senha: ''
          }}
          validationSchema={loginSchemaValidation}
          onSubmit={handleLogin}
        >
          {({ errors, handleChange }) => (
            <Form className='form' noValidate>
              <div className="field">
                <label htmlFor="email">Email</label>
                <Field
                  type='email'
                  name='email'
                  placeholder='Insira seu email'
                  id='email'
                  onChange={handleChange}
                  
                  required
                />
                <ErrorMessage
                  name='email'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Senha</label>
                <div className='icon-relative'>
                  <Field
                    name='senha'
                    placeholder='Insira sua senha'
                    id='password'
                    onChange={handleChange}
                    type={showPass ? 'text' : 'password'}
                    required
                  />
                  <span className='show-pass-icon' onClick={() => setShowPass(prev => !prev)}>
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <ErrorMessage
                  name='senha'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <Link to='#' className='forget-pass-link'>
                Esqueci minha senha
              </Link>
              <div className="field-submit">
                {isLoading ? <span className="loader"></span> : <input className='submit-button' type="submit" value="Entrar" />}
              </div>
              
            </Form>
          )}
        </Formik>
        <p className='sign-up'>
          Novo aqui? <Link to='/cadastro'>Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;