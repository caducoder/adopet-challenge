import { useState } from 'react'
import LogoDark from '../../assets/logo-dark.svg'
import Paws from '../../assets/paws.svg'
import { FaEyeSlash, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup';
import './Register.scss'


interface SignupFormValues {
  email: string,
  nome: string,
  senha: string,
  confirmarSenha: string
}

const registerSchemaValidation = Yup.object().shape({
  email: Yup.string().email('email inválido').required('email é obrigatório'),
  nome: Yup.string().min(3, 'mínimo de 3 caracteres').required('nome é obrigatório'),
  senha: Yup.string().min(6, 'senha deve ter no mínimo 6 caracteres').required('senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'as senhas não combinam')
    .required('confirmação de senha obrigatória')
})

function Register() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false);

  const handleSignup = (values: SignupFormValues) => {
    console.log(values)
    navigate('/pets')
  }

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
        <Formik
          initialValues={{
            email: '',
            nome: '',
            senha: '',
            confirmarSenha: ''
          }}
          validationSchema={registerSchemaValidation}
          onSubmit={handleSignup}
        >
          {({ errors, handleChange }) => (
            <Form className='form' noValidate>
              <div className="field">
                <label htmlFor="email">Email</label>
                <Field
                  type='email'
                  name='email'
                  placeholder='Escolha seu melhor email'
                  id='email'
                  onChange={handleChange}
                  required
                />
                <ErrorMessage
                  name='email'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="name">Nome</label>
                <Field
                  type="text"
                  name='nome'
                  id="name"
                  placeholder='Digite seu nome completo'
                  onChange={handleChange}
                />
                <ErrorMessage
                  name='nome'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className="field">
                <label htmlFor="password">Senha</label>
                <div className='icon-relative'>
                  <Field
                    name='senha'
                    placeholder='Crie uma senha'
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
              <div className="field">
                <label htmlFor="password">Confirme sua senha</label>
                <div className='icon-relative'>
                  <Field
                    name='confirmarSenha'
                    placeholder='Repita a senha criada acima'
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
                  name='confirmarSenha'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <input className='submit-button' type="submit" value="Cadastrar" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;