import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostsType} from '../redux/state';
// import {PostsType} from '../redux/state';

// type PropsType = {
//     posts: Array<PostsType>
// }


export type PostsAllType = {
    posts: Array<PostsType>;
    addTask: (message: string) => void
}


export function Profile(props: PostsAllType) {


    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPosts addTask={props.addTask} posts={props.posts}/>
            {/*<MyPosts posts={props.posts}/>*/}
        </div>
    )
}
