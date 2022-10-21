import {v1} from 'uuid';

const SEND_MESSAGE = 'SEND-MESSAGE';



type ActionType = PostTextActionType

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

export const dialogsReducer = (state= initialState, action: ActionType): initialStateDialogsType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,
                    {id: v1(), message: action.newDialogMessageBody}]
            };
        default:
            return state
    }
}

type PostTextActionType = {
    type: typeof SEND_MESSAGE
    newDialogMessageBody: string
}
export const postTextCBAC = (newDialogMessageBody: string): PostTextActionType => ({type: SEND_MESSAGE, newDialogMessageBody})
