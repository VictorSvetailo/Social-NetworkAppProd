import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';


export function Profile() {
    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPosts/>
        </div>

    )
};
