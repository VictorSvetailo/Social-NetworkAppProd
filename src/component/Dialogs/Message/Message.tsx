import React, {ChangeEvent, MouseEvent} from 'react';
import styles from '../Message/Message.module.css';
import {ActionsTypes, MessagesType} from '../../redux/state';
import {addNewTextCBAC, postTextCBAC} from '../../redux/dialogs-reducer';

type MessagesPropsType = {
    messages: Array<MessagesType>
    //addNewTextCB: (text: string) => void
    //addPostCB: (postTextCB: string) => void
    messageForCB: string
    dispatch: (action: ActionsTypes) => void
}


export function Message(props: MessagesPropsType) {

    let text;
    //const [addText, setAddText] = useState('')

    let onChangeAddTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(addNewTextCBAC(e.currentTarget.value))
        //props.addNewTextCB(e.currentTarget.value)
    }
    const onClickAddPostHandler = (e: MouseEvent<HTMLButtonElement>) => {
      props.dispatch(postTextCBAC(props.messageForCB))
      //props.addPostCB(props.messageForCB)
    }


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
            <h1>
                <hr/>

                <hr/>
            </h1>
            <textarea value={props.messageForCB} onChange={onChangeAddTextHandler}></textarea>
            <button onClick={onClickAddPostHandler}>Add Post</button>
        </div>
    );
};
