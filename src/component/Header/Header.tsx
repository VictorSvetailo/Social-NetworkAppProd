import React from 'react';
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';


export type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export const Header: React.FC<PropsType> = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Aperture_Science.svg" alt=""/>
                </div>
                <div className={styles.loginBlock}>
                    {props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'./login'}>Login</NavLink>}
                </div>

                <p>Social network project.</p>
            </div>
        </div>

    );
}
