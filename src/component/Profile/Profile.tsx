import React from 'react'
import styles from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfilePropsType} from './ProfileContainer';
import {Button} from 'antd';



export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={styles.blocks}>
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>
    )
}
