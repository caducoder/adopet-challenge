import LogoLight from '../../assets/logo-light.svg'
import SideWave from '../../assets/side-wave.svg'
import PetDraw from '../../assets/pets-draw.svg'
import Button from '../../components/Button';
import './Welcomepage.scss'

function Welcomepage() {
  return (
    <>
      <div className="main">
        <div className='initial'>
          <img className='logo-home' src={LogoLight} alt="Logo" />
          <h1>Boas-vindas!</h1>
          <p>
            Adotar pode mudar uma vida. Que tal buscar seu novo melhor amigo hoje?
            Vem com a gente!
          </p>
          <div className="buttons">
            <Button to=''>Já tenho conta</Button>
            <Button to=''>Quero me cadastrar</Button>
          </div>

        </div>
        <img className='side-wave' src={SideWave} alt="" />
        <img className='pets-draw' src={PetDraw} alt="" />
      </div>
    </>
  );
}

export default Welcomepage;