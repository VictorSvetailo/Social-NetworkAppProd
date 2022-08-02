import React from 'react';
import styles from './Sidebar.module.css'
import {NavLink} from 'react-router-dom';

export function Sidebar(){
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={`${styles.link}`}><NavLink to="/profile" className={ navData => navData.isActive ? styles.active : styles.link} >Profile</NavLink></div>
                <div className={`${styles.link} ${styles.active}`}><NavLink to="/dialogs" className={ navData => navData.isActive ? styles.active : styles.link}>Message</NavLink></div>
                <div className={`${styles.link} ${styles.active}`}><NavLink to="/news" className={ navData => navData.isActive ? styles.active : styles.link}>News</NavLink></div>
                <div className={`${styles.link} ${styles.active}`}><NavLink to="/music" className={ navData => navData.isActive ? styles.active : styles.link}>Music</NavLink></div>
                <div className={`${styles.item} ${styles.active}`}><NavLink to="/sittings" className={ navData => navData.isActive ? styles.active : styles.item}>Sittings</NavLink></div>
            </div>
        </div>

    );
}