import { Link, useNavigate } from 'react-router-dom';
import TopLeftWave from '../../assets/top-wave.svg'
import HomeIcon from '../../assets/casa.svg'
import MessageIcon from '../../assets/mensagens.svg'
import Logo from '../../assets/logo-light.svg'
import UserIcon from '../../assets/user-icon.svg'
import { FaSignOutAlt } from 'react-icons/fa'
import './Header.scss';
import { useAuth } from '../../hooks/useAuth';

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const signout = () => {
    logout();
    navigate('/');
  }

  return (
    <header className='main-header'>
      <img className='top-left-wave' src={TopLeftWave} alt="" />
      <div className='nav'>
        <img className='nav-logo' src={Logo} alt="logo da adopet" />
        <Link to='/pets'>
          <img src={HomeIcon} alt="link para a homepage" />
        </Link>
        <Link to='/mensagem'>
          <img src={MessageIcon} alt="link para enviar mensagem" />
        </Link>
      </div>
      {
        user &&
        <div className='nav-right'>
          <Link to='/perfil'>
            <img className='user-icon' src={user?.photoURL || UserIcon} alt="ícone do usuário" />
          </Link>
          <button className='logout-button' onClick={signout}>
            <FaSignOutAlt size={20} className='logout-icon' />
            <span>Sair</span>
          </button>
        </div>
      }
    </header>
  );
}

export default Header;