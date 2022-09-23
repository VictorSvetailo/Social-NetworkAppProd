import React, {ChangeEvent, MouseEvent, useState} from 'react';
import styles from './MyPosts.module.css'
import {Post} from './Post/Post';
import {DialogsPropsType} from './MyPostsContainer';


export function MyPosts(props: DialogsPropsType) {
    const onClickAddPostHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (props.messageForNewPost.trim() !== '') {
            props.onClickAddPost(props.messageForNewPost.trim())
        }
    }

    const onChangeAddPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChangeAddPost(e.currentTarget.value);
    }

    return (
        <div>
            <h3>My post</h3>
            <h4>-{props.messageForNewPost}-</h4>
            <textarea value={props.messageForNewPost} onChange={onChangeAddPostHandler}></textarea>
            <div>
                <button onClick={onClickAddPostHandler}>Add post</button>
            </div>
            <div className={styles.block}>
                <div className={styles.posts}>
                    <Post posts={props.posts}/>
                    <div className={styles.like}><b>Like</b></div>
                </div>
            </div>
        </div>
    );
};
