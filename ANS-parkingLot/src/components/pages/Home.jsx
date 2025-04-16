import { useEffect, useState } from 'react';
import ParkingSpotCard from '../ParkingSpotCard';
import styles from './Home.module.css';
import carIcon from '../../img/parking-spot.png';
import MainMenu from './MainMenu';


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
   
    <div className={styles.MainBox}>
      <MainMenu/>
    </div>
    
  );
}

export default Home;
