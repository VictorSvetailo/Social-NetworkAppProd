import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsTypes, PostsType} from '../redux/state';

type PropsType = {
    posts: Array<PostsType>
    addPostCallback: (postText: string) => void
    messageAdd: string
    changeNewTextCallback: (newText: string) => void
    dispatch: (action: ActionsTypes) => void
}


export function Profile(props: PropsType) {

    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPosts
                dispatch={props.dispatch}
                //addPostCallback={props.addPostCallback}
                //changeNewTextCallback={props.changeNewTextCallback}
                messageAdd={props.messageAdd}
                posts={props.posts}/>
        </div>
    )
}
