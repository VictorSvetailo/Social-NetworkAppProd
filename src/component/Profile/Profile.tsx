import React from 'react'
import styles from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export function Profile() {

    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
