import React from 'react';
import styles from './MyPosts.module.css'
// import {Post} from './Post/Post';
import state from '../../redux/state';
import {Post} from './Post/Post';

export function MyPosts() {
    return (
        <div>
            <h3>My post</h3>
            <h4>New Post</h4>
            <textarea></textarea>
            <button>Add post</button>
            <div className={styles.block}>
                <div className={styles.posts}>
                    <Post/>
                    <div className={styles.like}><b>Like</b></div>
                </div>
            </div>
        </div>
    );
};
