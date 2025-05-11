import { useEffect, useRef, useState } from 'react';
import ParkingSpotCard from '../ParkingSpotCard';
import styles from './Parking.module.css';
import GuestModal from '../modals/GuestModal';

function Parking() {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const carouselRef = useRef(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [guestModalOpen, setGuestModalOpen] = useState(false);


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
  openGuestModal(parkingSpot);
  };

  const openGuestModal = (spot) => {
  setSelectedSpot(spot);
  setGuestModalOpen(true);
};

const closeGuestModal = () => {
  setSelectedSpot(null);
  setGuestModalOpen(false);
};

const handleAddGuest = async ({ guestName, guestDocument, parkingSpotNumber }) => {
  try {
    const res = await fetch('http://localhost:8080/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestName,
        guestDocument,
        parkingSpotNumber,
      }),
    });

    if (!res.ok) throw new Error('Erro ao cadastrar convidado');
    alert('Convidado cadastrado com sucesso!');
    closeGuestModal();

    // Atualizar vagas, se necessário
    const updated = await fetch('http://localhost:8080/parking-spot');
    const data = await updated.json();
    setParkingSpaces(data);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 500;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Vagas</h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight:'50px' }}>
        <button
          onClick={() => scroll('left')}
          className={styles.cardButton}
          style={{ fontSize: '24px', padding: '16px', borderRadius: '8px' }}
        >
          ◀
        </button>

            <div className={styles.carousel} ref={carouselRef}>
      {parkingSpaces
        .sort((a, b) => a.parkingSpotNumber - b.parkingSpotNumber)
        .map((space) => (
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
     {/* Modal separado */}
      <GuestModal
      isOpen={guestModalOpen}
      onClose={closeGuestModal}
      parkingSpot={selectedSpot}
      onAddGuest={handleAddGuest}
    />


    </div>
  );

  
   
}

export default Parking;
