import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {DialogsPropsType} from './DialogsContainer';



export type NewMessageFormValuesType = {
    newDialogMessageBody: string
}

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let onClickAddPostCB = ( values: {NewMessageFormType: string}) => {
        props.sendMessage(values.NewMessageFormType)
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogs}/>
                </div>
                <Message
                    messages={props.messages}
                    onClickAddPostCB={onClickAddPostCB}
                />
            </div>
        </div>
    )
}

