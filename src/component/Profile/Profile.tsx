import React from 'react'
import styles from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {ProfilePropsType} from './ProfileContainer';



export function Profile(props: ProfilePropsType) {



    return (
        <div className={styles.blocks}>
            {/*<button onClick={()=>{idPageHandler1()}}>Hello</button>*/}
            <button>Hello</button>
            <ProfileInfo profile={props.profile}/>
            <MyPostsContainer/>
        </div>
    )
}
