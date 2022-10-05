import React, {ChangeEvent, MouseEvent} from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';

import {DialogsPropsType} from './DialogsContainer';


export function Dialogs(props: DialogsPropsType) {

    let onClickAddPostCB = (newDialogMessageBody: string) => {
        props.onClickAddPostCB(newDialogMessageBody)
    }
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogs}/>
                </div>
                <Message
                    messages={props.messages}
                    newDialogMessageBody={props.newDialogMessageBody}
                    onClickAddPostCB={onClickAddPostCB}
                />
            </div>
        </div>
    )
}

