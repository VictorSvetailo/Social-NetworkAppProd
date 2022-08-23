import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsType, MessagesType} from '../redux/state';

type DialogsPageAllType = {
    dialogsPage: Array<DialogsType>
    message: Array<MessagesType>
    addNewTextCB: (text: string) => void
    addPostCB: (postTextCB: string) => void
    messageForCB: string
}


export function Dialogs(props: DialogsPageAllType) {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogsPage}/>
                </div>
                <Message messages={props.message}
                         addNewTextCB={props.addNewTextCB}
                         addPostCB={props.addPostCB}
                         messageForCB={props.messageForCB}/>
            </div>
        </div>
    );
}

