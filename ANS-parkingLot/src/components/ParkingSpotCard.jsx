import React from 'react';
import styles from './ParkingSpotCard.module.css'; 
import carIcon from '../img/parking-spot.png'; 

const ParkingSpotCard = ({ parkingSpot, onDelete, onEdit }) => {
  const vehicle = parkingSpot.vehicle;
  const employee = vehicle?.employee;

  return (
    <div className={styles.card}>
      <img src={carIcon} alt="Carro" className={styles.carIcon} />
      <h3>Vaga: {parkingSpot.parkingSpotNumber}</h3>

      {employee ? (
        <>
          <p>Nome: {employee.name}</p>
          <p>Matrícula: {employee.employeeRegistrationNumber}</p>
          {employee.gender === "Masculino" && <p>Visitante</p>}
        </>
      ) : (
        <p>Funcionário não registrado</p>
      )}

      {vehicle ? (
        <>
          <p>Veículo: {vehicle.model}</p>
          <p>Concessionária: {vehicle.brand}</p>
          <p>Cor: {vehicle.color}</p>
          <p>Placa: {vehicle.licensePlate}</p>
        </>
      ) : (
        <p>Vaga livre</p>
      )}

      <div className={styles.buttons}>
        <button onClick={() => onEdit(parkingSpot)}>Editar</button>
        <button onClick={() => onDelete(parkingSpot.parkingSpotNumber)}>Excluir</button>
      </div>
    </div>
  );
};

export default ParkingSpotCard;
