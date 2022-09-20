import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsType, MessagesType} from '../redux/store';

type DialogsPageAllType = {
    dialogs: Array<any>
    message: Array<MessagesType>
    //  addNewTextCB: (text: string) => void
    //  addPostCB: (postTextCB: string) => void
    messageForCB: string
    //dispatch: (action: ActionsTypes) => void
    dispatch: (action: ActionsTypes) => void
}


export function Dialogs(props: DialogsPageAllType) {

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogs}/>
                </div>
                <Message
                    messages={props.message}
                    dispatch={props.dispatch}
                    //addNewTextCB={props.addNewTextCB}
                    //addPostCB={props.addPostCB}
                    messageForCB={props.messageForCB}
                />
            </div>
        </div>
    )
}

