import { Link } from 'react-router-dom';
import TopLeftWave from '../../assets/top-wave.svg'
import HomeIcon from '../../assets/casa.svg'
import MessageIcon from '../../assets/mensagens.svg'
import Logo from '../../assets/logo-light.svg'
import User from '../../assets/user-icon.svg'
import './Header.scss';

function Header() {
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
      <Link to='/perfil'>
        <img className='user-icon' src={User} alt="ícone do usuário" />
      </Link>
    </header>
  );
}

export default Header;