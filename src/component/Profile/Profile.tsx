import React from 'react'
import styles from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfilePropsType} from './ProfileContainer';



export const Profile: React.FC<ProfilePropsType> = (props) => {

    return (
        <div className={styles.blocks}>
            {/*<button onClick={()=>{idPageHandler1()}}>Hello</button>*/}
            {/*<button>Hello</button>*/}
            <ProfileInfo
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    )
}
