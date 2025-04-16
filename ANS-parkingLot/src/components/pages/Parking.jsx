import { useEffect, useRef, useState } from 'react';
import ParkingSpotCard from '../ParkingSpotCard';
import styles from './Parking.module.css';

function Parking() {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const carouselRef = useRef(null);

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
      setParkingSpaces(prev =>
        prev.filter(space => space.parkingSpotNumber !== parkingSpotNumber)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (parkingSpot) => {
    console.log(`Editando vaga: `, parkingSpot);
    // lógica de edição futura
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Vagas</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={() => scroll('left')}
          className={styles.cardButton}
          style={{ fontSize: '24px', padding: '16px', borderRadius: '8px' }}
        >
          ◀
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {parkingSpaces.map((space) => (
            <div key={space.parkingSpotNumber} className={styles.card}>
              <ParkingSpotCard
                parkingSpot={space}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className={styles.cardButton}
          style={{ fontSize: '24px', padding: '16px', borderRadius: '8px' }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Parking;
