import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from '../redux/state';

type PropsType = {
    posts: Array<PostsType>
}
export function Profile(props: PropsType) {
    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
};
