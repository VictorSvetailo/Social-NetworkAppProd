
import {getAuthMe, SetAuthUserDataActionType} from './auth-reducer';
import {Dispatch} from 'redux';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
    globalError: null,
}

export type InitialStateType = typeof initialState


type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS // 'INITIALIZED_SUCCESS'
}


type ActionsType = InitializedSuccessActionType | SetAuthUserDataActionType


export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}
export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})


export const initializeApp = () => (dispatch: Dispatch<any>) => {
    let promise = dispatch(getAuthMe())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}