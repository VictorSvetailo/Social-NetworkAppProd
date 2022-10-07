import {authAPI} from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

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
                ...action.payload
            };
        default:
            return state;
    }
}
export const setAuthUserData = (id: any, email: any, login: any, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    } as const
}
export const getAuthMe = () => (dispatch: any) => {
    authAPI.getMe()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}
export const login = (email: string, password: string, rememberMy: boolean) => (dispatch: any) => {
    authAPI.login(email, password, rememberMy)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthMe())
            }
        })
}
export const logout = () => (dispatch: any) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}