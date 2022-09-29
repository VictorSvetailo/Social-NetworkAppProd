import {v1} from 'uuid';
import {log} from 'util';
import {authAPI, usersAPI} from '../api/api';
import {setUserProfile} from './profile-reducer';


const SET_USER_DATA = 'SET_USER_DATA';


// export type PostsType = {
//     id: string
//     message: string
//     likesCount: number
// }

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        default:
            return state;
    }
}
export const setAuthUserData = (id: string, email: string, login: string) => {
    return {
        type: SET_USER_DATA,
        data: {id, email, login}
    } as const
}
export const getAuthMe = () => (dispatch: any) => {
    authAPI.getMe()
        .then(response => {
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login))
        }
    })
}
