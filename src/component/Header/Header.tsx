import React from 'react';
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {ProfilePropsType} from './HeaderContainer';


export function Header(props: ProfilePropsType) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img  src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Aperture_Science.svg" alt=""/>
                </div>
                <div className={styles.loginBlock}>
                    {props.isAuth
                        ? props.login
                        : <NavLink to={'./login'}>Login</NavLink>}

                </div>

                <p>Social network project.</p>
            </div>
        </div>

    );
}
