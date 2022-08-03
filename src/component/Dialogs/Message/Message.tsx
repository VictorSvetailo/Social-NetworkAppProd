import React from 'react';
import styles from '../Message/Message.module.css';
import {MessagesType} from '../../redux/state';

type MessagesPropsType = {
    messages: Array<MessagesType>
}

export function Message(props: MessagesPropsType) {
    return (
        <div className={styles.messages}>
            {props.messages.map((m) => {
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
