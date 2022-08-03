import React from 'react';
import styles from './MyPosts.module.css'
import {Post} from './Post/Post';
import {PostsType} from '../../redux/state';

type PropsType = {
    posts: Array<PostsType>
}

export function MyPosts(props: PropsType) {
    return (
        <div>
            <h3>My post</h3>
            <h4>New Post</h4>
            <textarea></textarea>
            <button>Add post</button>
            <div className={styles.block}>
                <div className={styles.posts}>
                    <Post posts={props.posts}/>
                    <div className={styles.like}><b>Like</b></div>
                </div>
            </div>
        </div>
    );
};
