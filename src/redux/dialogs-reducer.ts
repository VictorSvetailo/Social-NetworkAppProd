import {v1} from 'uuid';
import {InferActionsTypes} from './redux-store';

export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: string
    message: string
}
const initialState = {
    dialogs: [
        {id: 1, name: 'Victor'},
        {id: 2, name: 'Roma'},
        {id: 3, name: 'Max'},
        {id: 4, name: 'Valera'},
        {id: 5, name: 'Sasha'},
        {id: 6, name: 'Nastya'},
    ] as Array<DialogsType>,
    messages: [
        {id: v1(), message: '--Hi Yo'},
        {id: v1(), message: 'My name is Victor'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'From Russia with love'},
        {id: v1(), message: 'Whats new?'},
    ] as Array<MessagesType>,
}
export type initialStateDialogsType = typeof initialState

export const dialogsReducer = (state = initialState, action: ActionsType): initialStateDialogsType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE':
            return {
                ...state,
                messages: [...state.messages,
                    {id: v1(), message: action.newDialogMessageBody}]
            };
        default:
            return state
    }
}

export type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    postTextCBAC: (newDialogMessageBody: string) => ({type: 'SN/DIALOGS/SEND-MESSAGE', newDialogMessageBody} as const)
}


