import React, {ChangeEvent, useState} from 'react';
import styles from './MyPosts.module.css'
import {PostsType} from '../../redux/store';
import {Post} from './Post/Post';



type PropsType = {
    posts: Array<PostsType>
    messageForNewPost: string
    onClickAddPost: () => void
    onChangeAddPost: (value: string) => void
}

export function MyPosts(props: PropsType) {
    const onClickAddPostHandler = () => {
        props.onClickAddPost()
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
