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

const loginSchemaValidation = Yup.object().shape({
  email: Yup.string().email('email inválido').required('Insira seu email'),
  senha: Yup.string().min(6, 'Mínimo de 6 caracteres').required('Insira sua senha'),
})

function Login() {
  const { authenticate } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (values: { email: string, senha: string }) => {
    try {
      await authenticate(values.email, values.senha)
      navigate('/pets')
    } catch (error) {
      console.log("ERRO: " + error)
    }
  }

  return (
    <div className="login-container">
      <img className='paws' src={Paws} alt="" />
      <img className='logo-login' src={LogoDark} alt="" />

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
              <input className='submit-button' type="submit" value="Entrar" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;