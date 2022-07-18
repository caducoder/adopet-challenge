import PetCard from '../../components/PetCard';
import { pets } from '../../data';
import './Home.scss'

function Home() {
  return (
    <div className="home-container">
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