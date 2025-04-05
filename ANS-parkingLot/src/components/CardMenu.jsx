import React from 'react';
import styles from './'; 


const CardMenu = ({ name, page, icon }) => {
  return (
    <div className={styles.card} onClick={<Link to ={page}/>}>
      <img src={icon} alt="menuIcon" className={styles.icon} />
      <h3> {name}</h3>
    </div>
  );
};

export default CardMenu;

