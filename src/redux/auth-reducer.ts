import {ResultCodeEnum, ResultCodeForCaptchaEnum} from '../api/api';
import {stopSubmit} from 'redux-form';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {authAPI} from '../api/auth-api';
import {securityAPI} from '../api/security-api';

export type InitialStateType = {
    id: number | null
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

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export type ActionsType = InferActionsTypes<typeof actions>
const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
            ({type: 'auth/SET_USER_DATA', payload: {id, email, login, isAuth}} as const),
    getCaptchaUrlSuccessAC: (captchaUrl: string) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}

type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthMe = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.getMe()
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMy: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMy, captcha)
    if (loginData.resultCode === ResultCodeEnum.Success) {
        await dispatch(getAuthMe())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccessAC(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}