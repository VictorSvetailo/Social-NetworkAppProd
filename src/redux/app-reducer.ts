
import {getAuthMe} from './auth-reducer';
import {Dispatch} from 'redux';
import {InferActionsTypes} from './redux-store';

const initialState = {
    initialized: false,
    globalError: null,
}

export type InitialStateType = typeof initialState



export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

type ActionsType = InferActionsTypes<typeof actions>
const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: Dispatch<any>) => {
    let promise = dispatch(getAuthMe())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}