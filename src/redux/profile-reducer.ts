import {v1} from 'uuid';
import {log} from 'util';
import {profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {stopSubmit} from 'redux-form';
import {PhotosType} from '../types/types';
import {AppStateType} from './redux-store';


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';




export type PostsType = {
    id: string
    message: string
    likesCount: number
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}


export type ProfileType = {
    userId: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
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
    profile: null as ProfileType | null,
    idPageCurrent: 1,
    status: '',
}

export type InitialStateType = typeof initialState

type ActionsType = AddPostActionType
    | SetStatusActionType
    | DeletePostACActionType
    | SavePhotoSuccessActionType
    | SetUserProfileActionType

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            };
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}


type AddPostActionType = {
    type: typeof ADD_POST
    newProfileMessageBody: string
}
export const addPostAC = (newProfileMessageBody: string): AddPostActionType => ({type: ADD_POST, newProfileMessageBody})

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatusAC = (status: string): SetStatusActionType => ({type: SET_STATUS, status: status})

type DeletePostACActionType = {
    type: typeof DELETE_POST
    postID: string
}
export const deletePostAC = (postID: string): DeletePostACActionType => ({type: DELETE_POST, postID})

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccessAC = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
}

export const getUserProfile = (userID: string) => (dispatch: Dispatch) => {
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
    try {
        const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
        debugger
    }
}

export const savePhoto = (file: any) => async (dispatch: Dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photo))
    }
}

export const saveProfile = (profileInfo: any) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    const id = getState().auth.id
    const response = await profileAPI.saveProfile(profileInfo)
    if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(getUserProfile(id))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}
