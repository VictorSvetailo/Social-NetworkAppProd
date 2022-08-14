import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from '../redux/state';

type PropsType = {
    posts: Array<PostsType>
    addPostCallback: (postText: string) => void
    messageAdd: string
    changeNewTextCallback: (newText: string) => void
}


export function Profile(props: PropsType) {

    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPosts addPostCallback={props.addPostCallback} changeNewTextCallback={props.changeNewTextCallback} messageAdd={props.messageAdd} posts={props.posts}/>
        </div>
    )
}
