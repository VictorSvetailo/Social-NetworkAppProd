import React, {ChangeEvent, MouseEvent} from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';

import {DialogsPropsType} from './DialogsContainer';
import {Navigate} from 'react-router-dom';

// type DialogsPageAllType = {
//     dialogs: Array<any>
//     messages: Array<MessagesType>
//     messageForCB: string
//     onChangeAddTextCB: (value: string) => void
//     onClickAddPostCB: (text: string) => void
// }


export function Dialogs(props: DialogsPropsType) {


    let onChangeAddTextCB = (value: string) => {
        props.onChangeAddTextCB(value)
    }
    let onClickAddPostCB = (text: string) => {
        props.onClickAddPostCB(text)
    }
    // const onClickAddPostCB = (e: MouseEvent<HTMLButtonElement>) => {
    //     store.dispatch(postTextCBAC(props.messageForCB))
    //     // props.addPostCB(props.messageForCB)
    // }

    // if (!props.isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs__items}>
                <div className={styles.names}>
                    <DialogsItem dialogs={props.dialogs}/>
                </div>
                <Message
                    messages={props.messages}
                    //dispatch={props.dispatch}
                    //addNewTextCB={props.addNewTextCB}
                    //addPostCB={props.addPostCB}
                    messageForCB={props.messageForCB}
                    onChangeAddTextCB={onChangeAddTextCB}
                    onClickAddPostCB={onClickAddPostCB}
                />
            </div>
        </div>
    )
}

