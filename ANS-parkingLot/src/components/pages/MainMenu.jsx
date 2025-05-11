import { useState } from 'react';
import ParkingSpotCard from '../ParkingSpotCard';
import styles from './MainMenu.module.css';
import carIcon from '../../img/parking-spot.png';
import guestIcon from '../../img/guest.png';
import parkingIcon from '../../img/parking.png';
import employeeIcon from '../../img/teamwork.png';
import logoutIcon from '../../img/logout.png';
import { Link } from 'react-router-dom';
import CardMenu from '../CardMenu';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

function MainMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.MainBox}>
      <nav className={`${styles.navBar} ${isOpen ? styles.expanded : styles.collapsed}`}>
        <div className={styles.menu}>
          <button className={styles.toggleButton} onClick={toggleMenu}>
            {isOpen ? <FaArrowLeft className={styles.arrowIcon} /> : <FaArrowRight className={styles.arrowIcon} />}
          </button>
          <ul className={styles.list}>
            <li>
              <CardMenu icon={employeeIcon} name="Funcionários" page="/employees" />
            </li>
            <li>
              <CardMenu icon={guestIcon} name="Visitantes" page="/home" />
            </li>
            <li>
              <CardMenu icon={parkingIcon} name="Vagas" page="/parking" />
            </li>
            <li>
              <CardMenu icon={logoutIcon} name="Sair" page="/home" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default MainMenu;
