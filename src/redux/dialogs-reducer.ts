import {v1} from 'uuid';

const SEND_MESSAGE = 'SEND-MESSAGE';


export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: string
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    newDialogMessageBody?: string
    messages: Array<MessagesType>
}


const initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Victor'},
        {id: 2, name: 'Roma'},
        {id: 3, name: 'Max'},
        {id: 4, name: 'Valera'},
        {id: 5, name: 'Sasha'},
        {id: 6, name: 'Nastya'},
    ],
    messages: [
        {id: v1(), message: '--Hi Yo'},
        {id: v1(), message: 'My name is Victor'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'From Russia with love'},
        {id: v1(), message: 'Whats new?'},

    ],
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: any): DialogsPageType => {
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
export const postTextCBAC = (newDialogMessageBody: string) =>

    ({type: SEND_MESSAGE, newDialogMessageBody}) as const
