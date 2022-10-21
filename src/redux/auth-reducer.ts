import {authAPI, securityAPI} from '../api/api';
import {stopSubmit} from 'redux-form';
import {Dispatch} from 'redux';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


export type InitialStateType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
}
type ActionType = SetAuthUserDataActionType | GetCaptchaUrlSuccessACActionType


export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}


type SetAuthUserDataPayloadActionType = {
    id: string | null
    email: string | null
    login: string | null
    isAuth: boolean
}
export type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataPayloadActionType
}
export const setAuthUserData = (id: string | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth}
    }
}

export type GetCaptchaUrlSuccessACActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string }
}
export const getCaptchaUrlSuccessAC = (captchaUrl: string): GetCaptchaUrlSuccessACActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }
}



export const getAuthMe = () => async (dispatch: Dispatch) => {
    let response = await authAPI.getMe()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMy: boolean, captcha: string) => async (dispatch: Dispatch<any>) => {
    let response = await authAPI.login(email, password, rememberMy, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthMe())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccessAC(captchaUrl))
}

export const logout = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}