import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import state from '../redux/state';
import {NavLink} from 'react-router-dom';

export function Dialogs() {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem/>
                </div>
                <Message/>
            </div>
        </div>
    );
};

export function Message() {
    return (
        <div className={styles.messages}>
            {state.dialogsPage.messages.map((m) => {
                return (
                    <div className={styles.message} key={m.id}>
                        <div className={styles.image}>
                            <img src="https://inlnk.ru/G6y07y" alt="+++"/>
                        </div>
                        <p>{m.message}</p>
                    </div>
                )
            })}
        </div>
    );
};
