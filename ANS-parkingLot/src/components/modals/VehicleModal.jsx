import React, { useState, useEffect } from 'react';
import {
  DialogBox,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter
} from '../dialogs/DialogBox.jsx';

import { FaCarAlt, FaPalette, FaKeyboard, FaIdCard } from 'react-icons/fa';
import styles from './GenericModal.module.css'; 


const VehicleModal = ({ isOpen, onClose, employee, onAddCar, onDeleteCar }) => {
  const [licensePlate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (employee?.vehicle) {
        setLicensePlate(employee.vehicle.licensePlate || '');
        setBrand(employee.vehicle.brand || '');
        setModel(employee.vehicle.model || '');
        setColor(employee.vehicle.color || '');
      } else {
        setLicensePlate('');
        setBrand('');
        setModel('');
        setColor('');
      }
    }
  }, [isOpen, employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!licensePlate || !brand || !model || !color) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await onAddCar({
        licensePlate,
        brand,
        model,
        color,
        employeeRegistrationNumber: employee.employeeRegistrationNumber,
      });
      onClose(false);
    } catch (error) {
      alert('Erro ao cadastrar veículo. Tente novamente!');
    }
  };

  if (!employee) return null;

  return (
    <DialogBox open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="text-teal-700 text-lg">
          {employee.vehicle ? 'Dados do Veículo' : 'Cadastrar Veículo'}
        </DialogTitle>
      </DialogHeader>

      <DialogContent>
        {employee.vehicle ? (
          <div className="space-y-2 text-sm text-gray-700">
          <p><FaIdCard className="inline mr-2" style={{ color: '#0056b3' }} /><strong style={{ color: '#0056b3' }}> Marca:</strong> {brand}</p>
          <p><FaCarAlt className="inline mr-2" style={{ color: '#0056b3' }} /><strong style={{ color: '#0056b3' }}> Modelo:</strong> {model}</p>
          <p><FaKeyboard className="inline mr-2" style={{ color: '#0056b3' }} /><strong style={{ color: '#0056b3' }}> Placa:</strong> {licensePlate}</p>
          <p><FaPalette className="inline mr-2" style={{ color: '#0056b3' }} /><strong style={{ color: '#0056b3' }}> Cor:</strong> {color}</p>



            <button
              onClick={() => onDeleteCar(employee.vehicle.id)}
              className={styles.deleteButton}
            >
              Excluir veículo
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="vehicleForm">
            <div>
              <label className={styles.label}>Placa</label>
              <div className={styles.inputGroup}>
                <FaKeyboard className={styles.icon} />
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Marca</label>
              <div className={styles.inputGroup}>
                <FaIdCard className={styles.icon} />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Modelo</label>
              <div className={styles.inputGroup}>
                <FaCarAlt className={styles.icon} />
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Cor</label>
              <div className={styles.inputGroup}>
                <FaPalette className={styles.icon} />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className="buttonContainer">

            <button type="submit" className={styles.submitButton}>
              Cadastrar veículo
            </button>
            </div>
          </form>
        )}
      </DialogContent>

      <DialogFooter>
        <button
          onClick={() => onClose(false)}
          className="text-sm text-gray-500 hover:underline"
        >
          X
        </button>
      </DialogFooter>
    </DialogBox>
  );
};

export default VehicleModal;
