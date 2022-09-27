import React from 'react';
import {addPostAC, changedNewTextAC, PostsType} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../../../redux/redux-store';


type MapStatePropsType = {
    posts: Array<PostsType>
    messageForNewPost: string
}

type MapDispatchPropsType = {
    onClickAddPost: (value: string) => void
    onChangeAddPost: (text: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        messageForNewPost: state.profilePage.messageForNewPost,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickAddPost: (value: string) => {
            dispatch(addPostAC(value))
        },
        onChangeAddPost: (text: string) => {
            dispatch(changedNewTextAC(text))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);






// type PropsType = {
//     store: any
// }

// export function MyPostsContainer(props: PropsType) {
//
//     const state = store.getState()
//
//     const onClickAddPost = (value: string) => {
//         props.store.dispatch(addPostAC(value))
//         console.log(props.store.dispatch)
//     }
//     const onChangeAddPost = (text: string) => {
//         props.store.dispatch(changedNewTextAC(text));
//     }
//
//     return (
//         <MyPosts posts={state.profilePage.posts}
//                      messageForNewPost={state.profilePage.messageForNewPost}
//                      onClickAddPost={onClickAddPost}
//                      onChangeAddPost={onChangeAddPost}/>
//
//     )
// };
