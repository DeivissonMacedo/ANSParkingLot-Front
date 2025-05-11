import React, { useState, useEffect } from 'react';
import {
  DialogBox,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter
} from '../dialogs/DialogBox.jsx';

import { FaUser, FaEnvelope, FaIdCard, FaCommentDots } from 'react-icons/fa';
import styles from './GenericModal.module.css'; 

const GuestModal = ({ isOpen, onClose, guest, onAddGuest, onDeleteGuest }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [visitReason, setVisitReason] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (guest) {
        setName(guest.name || '');
        setCpf(guest.cpf || '');
        setEmail(guest.email || '');
        setVisitReason(guest.visitReason || '');
      } else {
        setName('');
        setCpf('');
        setEmail('');
        setVisitReason('');
      }
    }
  }, [isOpen, guest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !cpf || !email || !visitReason) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      await onAddGuest({ name, cpf, email, visitReason });
      onClose(false);
    } catch (error) {
      alert('Erro ao cadastrar visitante. Tente novamente!');
    }
  };

  return (
    <DialogBox open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <DialogTitle className="text-teal-700 text-lg">
          {guest ? 'Dados do Visitante' : 'Cadastrar Visitante'}
        </DialogTitle>
      </DialogHeader>

      <DialogContent>
        {guest ? (
          <div className="space-y-2 text-sm text-gray-700">
            <p><FaUser className="inline mr-2" style={{ color: '#0056b3' }} /><strong>Nome:</strong> {name}</p>
            <p><FaIdCard className="inline mr-2" style={{ color: '#0056b3' }} /><strong>CPF:</strong> {cpf}</p>
            <p><FaEnvelope className="inline mr-2" style={{ color: '#0056b3' }} /><strong>Email:</strong> {email}</p>
            <p><FaCommentDots className="inline mr-2" style={{ color: '#0056b3' }} /><strong>Motivo:</strong> {visitReason}</p>

            <button
              onClick={() => onDeleteGuest(guest.id)}
              className={styles.deleteButton}
            >
              Excluir visitante
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="guestForm">
            <div>
              <label className={styles.label}>Nome</label>
              <div className={styles.inputGroup}>
                <FaUser className={styles.icon} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>CPF</label>
              <div className={styles.inputGroup}>
                <FaIdCard className={styles.icon} />
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Email</label>
              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.icon} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div>
              <label className={styles.label}>Motivo da Visita</label>
              <div className={styles.inputGroup}>
                <FaCommentDots className={styles.icon} />
                <input
                  type="text"
                  value={visitReason}
                  onChange={(e) => setVisitReason(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className="buttonContainer">
              <button type="submit" className={styles.submitButton}>
                Cadastrar visitante
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

export default GuestModal;
