import {AppStateType} from './redux-store';

export const selectLogin = (state: AppStateType) => {
    return state.auth.login
}

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

