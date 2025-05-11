import React from 'react';
import styles from './ParkingSpotCard.module.css'; 
import carIcon from '../img/parking-spot.png'; 

const ParkingSpotCard = ({ parkingSpot, onDelete, onEdit }) => {
  const vehicle = parkingSpot.vehicle;
  const employee = parkingSpot?.employee;

  return (
    <div className={styles.card}>
      <img src={carIcon} alt="Carro" className={styles.carIcon} />
      <h3>Vaga: {parkingSpot.parkingSpotNumber}</h3>

      {employee ? (
        <>
          <p><strong>Nome:</strong> {employee.name}</p>
          <p><strong>Matrícula:</strong> {employee.employeeRegistrationNumber}</p>
          {employee.gender === "Masculino" && <p>Visitante</p>}
        </>
      ) : (
        <p>Funcionário não registrado</p>
      )}

      {vehicle ? (
        <>
          <p><strong>Veículo:</strong> {vehicle.model}</p>
          <p><strong>Concessionária:</strong> {vehicle.brand}</p>
          <p><strong>Cor:</strong> {vehicle.color}</p>
          <p><strong>Placa:</strong> {vehicle.licensePlate}</p>
        </>
      ) : (
        <strong><p>Vaga livre</p></strong>
      )}

      <div className={styles.buttons}>
      {employee ? (
        <>
        <button className={styles.removeButton } onClick={() => onDelete(parkingSpot.parkingSpotNumber)}>Remover</button>
        </>
      ) : (
        <button className={styles.cardButton} onClick={() => onEdit(parkingSpot)}>Adicionar Visitante</button>
      )}
        
        
        
      </div>
    </div>
  );
};

export default ParkingSpotCard;
