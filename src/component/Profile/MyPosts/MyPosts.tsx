import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import styles from './MyPosts.module.css'
import {Post} from './Post/Post';
import {DialogsPropsType} from './MyPostsContainer';
import {Field, reduxForm} from 'redux-form';


export const MyPostForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder="Enter your message" name={'newProfileMessageBody'} component={'textarea'}/></div>
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


export function MyPosts(props: DialogsPropsType) {
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
};
