import React from 'react';
import {addPostAC, PostsType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';


type MapStatePropsType = {
    posts: Array<PostsType>
}

type MapDispatchPropsType = {
    onClickAddPost: (values: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickAddPost: (newProfileMessageBody: string) => {
            dispatch(addPostAC(newProfileMessageBody))
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
