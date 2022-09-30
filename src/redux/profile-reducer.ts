import {v1} from 'uuid';
import {log} from 'util';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';


const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


export type PostsType = {
    id: string
    message: string
    likesCount: number
}

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 5},
        {id: v1(), message: 'I will succeed!', likesCount: 21},
        {id: v1(), message: 'I\'m Victor', likesCount: 13},

    ] as Array<PostsType>,
    profile: null,
    idPageCurrent: 1,
    status: '',
}

export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                messageForNewPost: '',
                posts: [{id: v1(), message: action.postText, likesCount: 0}, ...state.posts],
            };
        case CHANGE_NEW_TEXT:
            return {...state, messageForNewPost: action.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        default:
            return state;
    }
}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}
export const changedNewTextAC = (newText: string) =>
    ({type: CHANGE_NEW_TEXT, newText: newText}) as const

export const setStatusAC = (status: string) =>
    ({type: SET_STATUS, status: status}) as const


export const setUserProfile = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    } as const
}
export const getUserProfile = (userID: any) => (dispatch: any) => {
    if (userID) {
        usersAPI.getProfile(userID).then(response => {
            dispatch(setUserProfile(response.data))
        })
    }
}

export const getStatus = (userID: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userID)
        .then(response => {
            dispatch(setStatusAC(response.data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {

            if (response.data.resultCode === 0) {
                dispatch(setStatusAC(status))
            }
        })
}


// export const idPage = (idPageCurrent: any) => {
//
// }

// export const idPageHandler2 = (idPageCurrent: any) => {
//     // console.log(params)
//     return {
//         // type: SET_USER_id_PAGE,
//         idPageCurrent: {...state, idPageCurrent: action.idPageCurrent}
//     } as const
// }
