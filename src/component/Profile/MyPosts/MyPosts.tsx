import React from 'react';
import styles from './MyPosts.module.css'
import {Post} from './Post/Post';
import {DialogsPropsType} from './MyPostsContainer';
import {Field, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validaters/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10)


export const MyPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field validate={[required, maxLength10]} placeholder="Enter your message"
                       name={'newProfileMessageBody'} component={Textarea}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const MyPostFormRedux = reduxForm({
    // a unique name for the form
    form: 'ProfileMessageForm'
})(MyPostForm)


export const MyPosts = React.memo((props: DialogsPropsType) => {
    console.log('Render MyPosts YO')
    const addNewMessage = (values: any) => {
        props.onClickAddPost(values.newProfileMessageBody);
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
