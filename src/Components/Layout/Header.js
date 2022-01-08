import React from "react";
import mealsImage from '../../assets/meals.jpg'
import styles from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header  = props => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <div>
                <h1>Venspar</h1>
     
                </div>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="a table full of delicious food"/>
            </div>
        </React.Fragment>
    )
};

export default Header;