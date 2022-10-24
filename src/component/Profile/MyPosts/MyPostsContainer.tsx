import React from 'react';
import {actions, PostsType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';

type MapStatePropsType = {
    posts: Array<PostsType>
}
type MapDispatchPropsType = {
    addPost: (values: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

export const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost: actions.addPostAC})(MyPosts);




// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         onClickAddPost: (newProfileMessageBody: string) => {
//             dispatch(actions.addPostAC(newProfileMessageBody))
//         },
//     }
// }