import {v1} from 'uuid';
import {log} from 'util';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';


const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';


export type PostsType = {
    id: string
    message: string
    likesCount: number
}

export const postID1 = v1()
export const postID2 = v1()
export const postID3 = v1()
export const postID4 = v1()
export const postID5 = v1()

const initialState = {
    posts: [
        {id: postID1, message: 'Hi, how are you?', likesCount: 12},
        {id: postID2, message: 'It\'s my first post', likesCount: 5},
        {id: postID3, message: 'I will succeed!', likesCount: 21},
        {id: postID4, message: 'I\'m Victor', likesCount: 13},

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
                posts: [{id: v1(), message: action.newProfileMessageBody, likesCount: 0}, ...state.posts],
            };
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_STATUS:
            return {...state, status: action.status};
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            }
        default:
            return state;
    }
}
export const addPostAC = (newProfileMessageBody: string) => {
    return {
        type: ADD_POST,
        newProfileMessageBody,
    } as const
}

export const setStatusAC = (status: string) => ({type: SET_STATUS, status: status}) as const
export const deletePostAC = (postID: string) => ({type: DELETE_POST, postID}) as const

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

export const getStatus = (userID: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userID)
            dispatch(setStatusAC(response.data))
}

export const updateStatus = (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}
