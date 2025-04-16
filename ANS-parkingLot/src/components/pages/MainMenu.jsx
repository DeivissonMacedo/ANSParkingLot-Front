import { useEffect, useState } from 'react';
import ParkingSpotCard from '../ParkingSpotCard';
import styles from './MainMenu.module.css';
import carIcon from '../../img/parking-spot.png';
import guestIcon from '../../img/guest.png';
import parkingIcon from '../../img/parking.png';
import employeeIcon from '../../img/teamwork.png';
import logoutIcon from '../../img/logout.png';
import {Link} from 'react-router-dom';
import CardMenu from '../CardMenu';
function MainMenu() {
 



  return (
   
    <div className={styles.MainBox}>

        <nav className={styles.navBar}>
        <div className={styles .menu }>
            <ul className={styles.list}>
                <li>
                <CardMenu
                          icon = {employeeIcon}
                          name = "Funcionarios"
                          page = "/employees"
                          />
                       
                </li>

                <li>
                <CardMenu
                          icon = {guestIcon}
                          name = "Visitantes"
                          page = "/home"
                          />
                </li>
                <li>
                <CardMenu
                          icon = {parkingIcon}
                          name = "Vagas"
                          page = "/parking"
                          />
                </li>
          
                <li>
                <CardMenu
                          icon = {logoutIcon}
                          name = "Sair"
                          page = "/home"
                          />
                </li>
                
            </ul>
        </div>
       
        </nav>
    </div>
    
  );
}

export default MainMenu;
