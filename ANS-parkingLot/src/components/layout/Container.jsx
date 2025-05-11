import styles from './Container.module.css';
import MainMenu from '../pages/MainMenu';


function Container(props){
    return (
        <div className={`${styles.container} ${styles[props.customClass]}`}>
                 <MainMenu />
            {props.children}
        </div>

    )

}export default Container