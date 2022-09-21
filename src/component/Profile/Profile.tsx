import React from 'react'
import styles from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import store from '../redux/redux-store';

type PropsType = {
   // posts: Array<PostsType>
   // addPostCallback: (postText: string) => void
    //messageAdd: string
    //changeNewTextCallback: (newText: string) => void
   // dispatch: (action: ActionsTypes) => void
}


export function Profile(props: PropsType) {

    return (
        <div className={styles.blocks}>
            <ProfileInfo/>
            <MyPostsContainer store={store}
                //dispatch={props.dispatch}
                //addPostCallback={props.addPostCallback}
                //changeNewTextCallback={props.changeNewTextCallback}
                //messageAdd={props.messageAdd}
               //posts={props.posts}
            />
        </div>
    )
}
