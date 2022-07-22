import { useNavigate } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik'
import * as Yup from 'yup';
import './Profile.scss'
import { useState } from 'react';

const profileSchemaValidation = Yup.object().shape({
  nome: Yup.string().min(3, 'nome deve ter no mínimo 3 caracteres').required('nome é obrigatório'),
  telefone: Yup.string()
    .matches(/^[0-9- ()]+$/g, 'número inválido'),
  cidade: Yup.string().min(3, 'cidade deve ter no mínimo 3 caracteres').required('cidade deve ser informada'),
  sobre: Yup.string()
})

const DEFAULT_PROFILE_PIC = "https://blog.criteria.com.br/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png"

function Profile() {
  const navigate = useNavigate()
  const [avatar, setAvatar] = useState(null);
  const [photoURL, setPhotoURL] = useState<string>(DEFAULT_PROFILE_PIC)

  // função que lida com a seleção da foto de perfil
  const handleAvatarChange = (e: any) => {
    let reader = new FileReader();

    if(e.target.files[0]) {
      setAvatar(e.target.files[0])

      reader.onload = () => {
        setPhotoURL(reader.result as string)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleProfileSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div className="profile-container">

      <p className='text'>
        Esse é o perfil que aparece para responsáveis ou ONGs que recebem sua mensagem.
      </p>
      <div className='form-container'>
        <Formik
          initialValues={{
            nome: '',
            telefone: '',
            cidade: '',
            sobre: '',
          }}
          validationSchema={profileSchemaValidation}
          onSubmit={handleProfileSubmit}
        >
          {({ errors, handleChange }) => (
            <Form noValidate className='form'>
              <h1 className='form-title'>Perfil</h1>
              <div className="field">
                <p>Foto</p>
                <label htmlFor="profile-pic-input" className='pic-label'>
                  <div className='pic-wrapper'>
                    <img src={photoURL} alt="Avatar" />
                    <input
                      type="file"
                      accept='image/*'
                      id='profile-pic-input'
                      onChange={handleAvatarChange}
                    />
                  </div>
                </label>
                <p className='pic-edit-info'>Clique na foto para editar</p>
              </div>
              <div className='field'>
                <label htmlFor="name">Nome</label>
                <Field
                  type="text"
                  name='nome'
                  placeholder='Insira seu nome completo'
                  onChange={handleChange}
                  id="name"
                />
                <ErrorMessage
                  name='nome'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="phone">Telefone</label>
                <Field
                  type="text"
                  name='telefone'
                  placeholder='Insira seu telefone e/ou whatsapp'
                  onChange={handleChange}
                  id="phone"
                />
                <ErrorMessage
                  name='telefone'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="city">Cidade</label>
                <Field
                  type="text"
                  name='cidade'
                  placeholder='Insira sua cidade'
                  onChange={handleChange}
                  id="city"
                />
                <ErrorMessage
                  name='cidade'
                  render={errMsg => <div className='erro'>{errMsg}</div>}
                />
              </div>
              <div className='field'>
                <label htmlFor="sobre">Sobre</label>
                <Field  
                  as='textarea'
                  rows={4}
                  cols={15}
                  name='sobre'
                  placeholder='Conte um pouco sobre você'
                  onChange={handleChange}
                  id="sobre"
                />
              </div>
              <input className='submit-button' type="submit" value="Salvar" />
            </Form>
          )}
        </Formik>
        {/* <form className='form' onSubmit={() => navigate('/pets')}>
          <h1 className='form-title'>Perfil</h1>
          <div className="field">
            <p>Foto</p>
            <label htmlFor="profile-pic" className='pic-label'>
              <div className='pic-wrapper'>
                <input
                  type="file"
                  accept='image/*'
                  id='profile-pic'
                />
              </div>
            </label>
            <p className='pic-edit-info'>Clique na foto para editar</p>
          </div>
          <div className='field'>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              placeholder='Insira seu nome completo'
              id="name"
            />
          </div>
          <div className='field'>
            <label htmlFor="phone">Telefone</label>
            <input
              type="text"
              placeholder='Insira seu telefone e/ou whatsapp'
              id="phone"
            />
          </div>
          <div className='field'>
            <label htmlFor="pet-name">Cidade</label>
            <input
              type="text"
              placeholder='Insira sua cidade'
              id="pet-name"
            />
          </div>
          <div className='field'>
            <label htmlFor="sobre">Sobre</label>
            <textarea
              rows={4}
              cols={15}
              placeholder='Conte um pouco sobre você'
              id="sobre"
            />
          </div>
          <input className='submit-button' type="submit" value="Salvar" />
        </form> */}
      </div>
    </div>
  );
}

export default Profile;