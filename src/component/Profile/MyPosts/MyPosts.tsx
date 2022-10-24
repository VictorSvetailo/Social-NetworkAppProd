import React from 'react';
import styles from './MyPosts.module.css'
import {Post} from './Post/Post';
import {DialogsPropsType} from './MyPostsContainer';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validaters/validators';
import {createField, GetStringKeys, Input, Textarea} from '../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10)

type PropsType = {}
type AddPostFormValuesType = {
    newProfileMessageBody: string
}
export type AddPostFormValuesTypeKeys =  GetStringKeys<AddPostFormValuesType>

export const MyPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType>  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>('Enter your message', 'newProfileMessageBody', [required, maxLength10], Textarea)}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const MyPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({
    // a unique name for the form
    form: 'ProfileMessageForm'
})(MyPostForm)


export const MyPosts = React.memo((props: DialogsPropsType) => {
    const addNewMessage = (values: AddPostFormValuesType) => {
        props.addPost(values.newProfileMessageBody);
    }

    return (
        <div>
            <h3>My post</h3>
            <MyPostFormRedux onSubmit={addNewMessage}/>
            <div className={styles.block}>
                <div className={styles.posts}>
                    <Post posts={props.posts}/>
                    <div className={styles.like}><b>Like</b></div>
                </div>
            </div>
        </div>
    );
});
