import React from 'react';
import styles from './Sidebar.module.css'

export function Sidebar(){
    return (
        <div className={styles.container}>
            <div className={styles.items}>
                <div className={`${styles.link} ${styles.active}`}><a>Profile</a></div>
                <div className={`${styles.link} ${styles.active}`}><a>Message</a></div>
                <div className={`${styles.link} ${styles.active}`}><a>News</a></div>
                <div className={`${styles.link} ${styles.active}`}><a>Music</a></div>
                <div className={`${styles.item} ${styles.active}`}><a>Sittings</a></div>
            </div>
        </div>

    );
}