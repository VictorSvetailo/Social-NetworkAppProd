import React, {ChangeEvent, MouseEvent} from 'react';
import styles from '../Message/Message.module.css';
import {MessagesType} from '../../../redux/dialogs-reducer';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Textarea} from '../../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../../utils/validaters/validators';
import {NewMessageFormValuesType} from '../Dialogs';

type MessagesPropsType = {
    messages: Array<MessagesType>
    onClickAddPostCB: (values: any) => void
}

const maxLength20 = maxLengthCreator(20)


type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>;    //'newDialogMessageBody'
type PropsType = {}

export const MyMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType>  = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>

                {createField<NewMessageFormValuesKeysType>('Enter your message', 'newDialogMessageBody', [required, maxLength20], Textarea)}

            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    );
};

const MyMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
    // a unique name for the form
    form: 'DialogMessageForm'
})(MyMessageForm)




export function Message(props: MessagesPropsType) {
    const onClickAddPost = (values: any) => {
     props.onClickAddPostCB(values.newDialogMessageBody)
    }


    return (
        <div className={styles.messages}>
            {[...props.messages].reverse().map((m) => {
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
