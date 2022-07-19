import { useNavigate } from 'react-router-dom';
import './Profile.scss'

function Profile() {
  const navigate = useNavigate()

  return (
    <div className="profile-container">

      <p className='text'>
        Esse é o perfil que aparece para responsáveis ou ONGs que recebem sua mensagem.
      </p>
      <div className='form-container'>
        <form className='form' onSubmit={() => navigate('/pets')}>
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
              placeholder='Por qual animal você se interessou?'
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
        </form>
      </div>
    </div>
  );
}

export default Profile;