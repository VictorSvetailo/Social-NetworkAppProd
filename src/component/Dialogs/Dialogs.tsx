import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {MyPosts} from '../Profile/MyPosts/MyPosts';

export function Dialogs(){
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                        <div className={styles.name + ' ' + styles.active}>Victor</div>
                        <div>Dmitry</div>
                        <div>Egor</div>
                        <div>Sveta</div>
                        <div>Nina</div>
                </div>
                <div className={styles.messages}>
                    <div className={styles.message}>
                        <div className={styles.image}>
                            <img src="https://inlnk.ru/G6y07y" alt="+++"/>
                        </div>
                        <p>Hello im Victor</p>
                    </div>
                    <div className={styles.message}>
                        <div className={styles.image}>
                            <img src="https://inlnk.ru/G6y07y" alt="+++"/>
                        </div>
                        <p>Hello im Egor</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

