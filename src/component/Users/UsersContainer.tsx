import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Users} from './Users';
import {AppStateType} from '../redux/redux-store';
import {followChangeAC, setUsersAC, UsersType} from '../redux/users-reducer';


type MapStatePropsType = {
    users: Array<UsersType>
    // messageForNewPost: string
}
//
type MapDispatchPropsType = {
    onClickFollowChange: (userID: string) => void
    setUsers: (users: Array<UsersType>) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickFollowChange: (userID: string) => {
            dispatch(followChangeAC(userID))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        },
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);


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
