import {v1} from 'uuid';
import {log} from 'util';


const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';


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
    profile: null
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
export const setUserProfile = (profile: any) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    } as const
}

