import React from 'react';
import styles from './ParkingSpotCard.module.css'; 
import carIcon from '../img/parking-spot.png'; 

const ParkingSpotCard = ({ parkingSpot, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <img src={carIcon} alt="Carro" className={styles.carIcon} />
      <h3>Vaga: {parkingSpot.parkingSpotNumber}</h3>
      <p>Nome: {parkingSpot.employeeName}</p>
      <p>Matrícula: {parkingSpot.employeeRegistrationNumber}</p>
      {parkingSpot.guest === "1" && <p>Visitante</p>}
      <p>Veículo: {parkingSpot.modelVehicle}</p>
      <p>Concessionária: {parkingSpot.brandVehicle}</p>
      <p>Cor: {parkingSpot.colorVehicle}</p>
      <p>Placa: {parkingSpot.licensePlateVehicle}</p>
      <div className={styles.buttons}>
        <button onClick={() => onEdit(parkingSpot)}>Editar</button>
        <button onClick={() => onDelete(parkingSpot.parkingSpotNumber)}>Excluir</button>
      </div>
    </div>
  );
};

export default ParkingSpotCard;
