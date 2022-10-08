
import {getAuthMe, setAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS})


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthMe())
    debugger
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}