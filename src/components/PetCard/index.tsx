import { Link } from 'react-router-dom';
import SendMsg from '../../assets/send-msg.svg'
import './PetCard.scss'

interface IPet {
  id: number;
  name: string;
  age: string;
  description: string;
  location: string;
  photo: string;
}

function PetCard(pet: IPet) {
  return (
    <div className="pet-card">
      <div className="photo">
        <img src={pet.photo} alt="pet photo" />
      </div>
      <div className="info">
        <p className='pet-name'>{pet.name}</p> 
        <p className='pet-age'>{pet.age}</p>
        <p className='pet-description'>{pet.description}</p>
        <p className='location'>{pet.location}</p>
        <Link className='link-send-msg' to='/mensagem'>
          <img src={SendMsg} alt="icon send mensage" />
          Falar com o responsável
        </Link>
      </div>
    </div>
  );
}

export default PetCard;