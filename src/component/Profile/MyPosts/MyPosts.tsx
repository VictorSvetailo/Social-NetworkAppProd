import React, {ChangeEvent, useState} from 'react';
import styles from './MyPosts.module.css'
import {PostsType} from '../../redux/state';
import {Post} from './Post/Post';
// import {PostsType} from '../../redux/state';

// type PropsType = {
//     posts: Array<PostsType>
// }


export type PostsAllType = {
    posts: Array<PostsType>;
    addTask: (message: string) => void
}

export function MyPosts(props: PostsAllType) {

    // useState
    const [message, setMessage] = useState<string>('')
    // Button
    const onClickAddPostHandler= ()=>{
        message && props.addTask(message)
        setMessage('')
    }
    // input
    const onChangeAddPostHandler= (e: ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.currentTarget.value)
    }

    return (
        <div>
            <h3>My post</h3>
            <h4>New Post</h4>
            <input value={message}
                   onChange={onChangeAddPostHandler}/>
            <button onClick={onClickAddPostHandler}>Add post</button>
            <div className={styles.block}>
                <div className={styles.posts}>
                    <Post posts={props.posts}/>
                    <div className={styles.like}><b>Like</b></div>
                </div>
            </div>
        </div>
    );
};
