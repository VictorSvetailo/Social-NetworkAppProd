import React from 'react';
import styles from './ProfileInfo.module.css';

export function ProfileInfo() {
    return (
        <div>
            <div className={styles.image}>
                <img
                    src="https://inlnk.ru/Pm5348"
                    alt=""/>
            </div>
            <h1>Hello Lorem ipsum dolor sit amet. </h1>
            <div><i>Hello Victor</i></div>
        </div>
    );
};

