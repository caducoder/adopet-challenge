import PetCard from '../../components/PetCard';
import { pets } from '../../data';
import User from '../../assets/user-icon.svg'
import './Home.scss'

function Home() {
  return (
    <div className="home-container">
      <img className='user-icon' src={User} alt="ícone do usuário" />
      <p className='title'>Olá! Veja os amigos disponíveis para adoção!</p>
      <section className='pet-container'>
        {pets.map(pet => (
          <PetCard key={pet.id} {...pet}/>
        ))}
      </section>
    </div>
  );
}

export default Home;