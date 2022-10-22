import {v1} from 'uuid';
import {stopSubmit} from 'redux-form';
import {PhotosType} from '../types/types';
import {AppStateType, BaseThunkType, InferActionsTypes} from './redux-store';
import {profileAPI} from '../api/profile-api';
import {ResultCodeEnum} from '../api/api';




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
type ActionsType = InferActionsTypes<typeof actions>

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            return {
                ...state,
                posts: [{id: v1(), message: action.newProfileMessageBody, likesCount: 0}, ...state.posts],
            };
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {...state, profile: action.profile};
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status};
        case 'SN/PROFILE/DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postID)
            };
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        default:
            return state;
    }
}


export const actions = {
    addPostAC: (newProfileMessageBody: string) => ({type: 'SN/PROFILE/ADD-POST', newProfileMessageBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatusAC: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status: status} as const),
    deletePostAC: (postID: string) => ({type: 'SN/PROFILE/DELETE_POST', postID} as const),
    savePhotoSuccessAC: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}

type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
export const getUserProfile = (userID: number | null): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userID)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userID: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userID)
    dispatch(actions.setStatusAC(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setStatusAC(status))
        }
    } catch (error) {
        //debugger
    }
}

export const savePhoto = (file: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodeEnum.Error) {
        dispatch(actions.savePhotoSuccessAC(data.data.photos))
    }
}

export const saveProfile = (profileInfo: ProfileType): ThunkType => async (dispatch, getState) => {
    const id = getState().auth.id
    const data = await profileAPI.saveProfile(profileInfo)
    if (data.resultCode === ResultCodeEnum.Success) {
        if (id !== null){
            await dispatch(getUserProfile(id))
        } else {
            throw new Error('userID can\'t be null')
        }


    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}
