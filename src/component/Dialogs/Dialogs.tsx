import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsType, MessagesType} from '../redux/state';

type DialogsPageAllType = {
    dialogsPage: Array<DialogsType>
    message: Array<MessagesType>
}

// type DialogsType = {
//     dialogsPage: Array<DialogsType>
// }
// type MessagePropsType = {
//     message: Array<MessagesType>
// }

export function Dialogs(props: DialogsPageAllType) {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogsPage}/>
                </div>
                <Message messages={props.message}/>
            </div>
        </div>
    );
}

