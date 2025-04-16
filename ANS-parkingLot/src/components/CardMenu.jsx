import React from 'react';
import styles from './CardMenu.module.css'; 
import { useNavigate } from 'react-router-dom';

const CardMenu = ({ name, page, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(page);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={icon} alt="menuIcon" className={styles.icon} />
      <h3>{name}</h3>
    </div>
  );
};

export default CardMenu;
