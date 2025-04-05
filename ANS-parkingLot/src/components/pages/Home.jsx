import { useEffect, useState } from 'react';
import ParkingSpotCard from '../CardMenu';
import styles from './Home.module.css';
import CardMenu from '../CardMenu';
import carIcon from '../../img/parking-spot.png';

function Home() {
  const [parkingSpaces, setParkingSpaces] = useState([]);

  useEffect(() => {
    const fetchParkingSpaces = async () => {
      try {
        const response = await fetch('http://localhost:8080/parking-spot'); 
        if (!response.ok) {
          throw new Error('Erro ao buscar vagas');
        }
        const data = await response.json();
        setParkingSpaces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParkingSpaces();
  }, []);

  const handleDelete = async (parkingSpotNumber) => {
  
    try {
      const response = await fetch(`http://localhost:8080/parking-spot/${parkingSpotNumber}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir vaga');
      }
      setParkingSpaces(parkingSpaces.filter(space => space.parkingSpotNumber !== parkingSpotNumber));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (parkingSpot) => {
    console.log(`Editando vaga: `, parkingSpot);
    // Lógica para editar a vaga, colocar depois
  };

  return (
    <div>
      <CardMenu
      icon = {carIcon}
      name = "Vagas"
      page = "/about"
      />
    <div className={styles.MainBox}>
      <h1>Vagas</h1>
      <div className={styles.parkingSpaces}>
        {parkingSpaces.map((space) => (
          <ParkingSpotCard 
          className={styles.parkingSpotCard}
            key={space.parkingSpotNumber} 
            parkingSpot={space} 
            onDelete={handleDelete} 
            onEdit={handleEdit} 
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
