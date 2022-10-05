import React, {ChangeEvent, MouseEvent} from 'react';
import styles from '../Message/Message.module.css';
import {MessagesType, postTextCBAC} from '../../../redux/dialogs-reducer';
import {log} from 'util';
import {Field, reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../../utils/validaters/validators';

type MessagesPropsType = {
    messages: Array<MessagesType>
    //addNewTextCB: (text: string) => void
    //addPostCB: (postTextCB: string) => void
    newDialogMessageBody: string
    // dispatch: (action: ActionsTypes) => void
    // onChangeAddTextCB: (value: string) => void
    onClickAddPostCB: (values: any) => void
}


const maxLength20 = maxLengthCreator(20)

export const MyMessageForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder="Enter your message" name={'newDialogMessageBody'} component={Textarea} validate={[required, maxLength20]}/></div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    );
};

const MyMessageFormRedux = reduxForm({
    // a unique name for the form
    form: 'DialogMessageForm'
})(MyMessageForm)




export function Message(props: MessagesPropsType) {
    const onClickAddPost = (values: any) => {
        console.log(values)
      props.onClickAddPostCB(values.newDialogMessageBody)
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
            <MyMessageFormRedux onSubmit={onClickAddPost}/>
        </div>
    );
};
