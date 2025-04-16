import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';
import Logo from '../../img/ANS_LOGO.png';

function NavBar(){
    return(
        <nav className={styles.navBar}>
        <Link to ="/"><img src={Logo} alt='ANS pinturas'/></Link>
        <div className={styles .menu }>
            <ul className={styles.list}>
                <li>
                    <Link to ="/">Home </Link>
                </li>

                <li>
                    <Link to ="/"> / Sobre</Link>
                </li>
            </ul>
        </div>
       
        </nav>
        


    )

}
export default NavBar;