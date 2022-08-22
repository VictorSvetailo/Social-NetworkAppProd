import React, {ChangeEvent, useState} from 'react';
import styles from './MyPosts.module.css'
import {PostsType} from '../../redux/state';
import {Post} from './Post/Post';

type PropsType = {
    posts: Array<PostsType>
    addPostCallback: (postText: string) => void
    messageAdd: string
    changeNewTextCallback: (newText: string) => void
}

export function MyPosts(props: PropsType) {

    const onChangeAddPostHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeNewTextCallback(e.currentTarget.value);

    }

    const onClickAddPostHandler = () => {
        props.addPostCallback(props.messageAdd)
    }

    return (
        <div>
            <h3>My post</h3>
            <h4>-{props.messageAdd}-</h4>
            <textarea value={props.messageAdd} onChange={onChangeAddPostHandler}></textarea>
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
