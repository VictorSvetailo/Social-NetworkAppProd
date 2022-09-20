import React, {ChangeEvent, useState} from 'react';
import {ActionsTypes, PostsType} from '../../redux/store';
import {addPostAC, changedNewTextAC} from '../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import store from '../../redux/redux-store';



type PropsType = {
    store: any
}

export function MyPostsContainer(props: PropsType) {
    const state = store.getState()

    const onClickAddPost = () => {
       props.store.dispatch(addPostAC(state.profilePage.messageForNewPost))
    }
    const onChangeAddPost = (value: string) => {
        props.store.dispatch(changedNewTextAC(value));
    }
    return (
       <MyPosts posts={state.profilePage.posts}
                messageForNewPost={state.profilePage.messageForNewPost}
                onClickAddPost={onClickAddPost}
                onChangeAddPost={onChangeAddPost}/>
    )
};
