import React from 'react';
import styles from './Header.module.css'


export function Header() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img  src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Aperture_Science.svg" alt=""/>
                </div>
                <p>Social network project.</p>
            </div>
        </div>

    );
}
