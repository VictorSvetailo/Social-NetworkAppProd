import {v1} from 'uuid';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
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
    messageForCB: string
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
    messageForCB: '',
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
        case UPDATE_NEW_MESSAGE_BODY:
            console.log('Hello')
            return {...state, messageForCB: action.text};
        case SEND_MESSAGE:
            return {
                ...state,
                messageForCB: '',
                messages: [...state.messages,
                    {id: v1(), message: state.messageForCB}]
            };
        default:
            return state
    }
    // Условие 2 вариант
    // if (action.type === UPDATE_NEW_MESSAGE_BODY) {
    //     state.messageForCB = action.text
    // } else if (action.type === SEND_MESSAGE) {
    //     const newPostText: PostsType2 = {
    //         id: v1(),
    //         // message: postTextCB,
    //         message: state.messageForCB,
    //     }
    //     state.messages.push(newPostText)
    //     state.messageForCB = ''
    // }
    // return state;
}

export const addNewTextCBAC = (value: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        text: value
    } as const
}
export const postTextCBAC = (postTextCB: string) =>
    ({type: SEND_MESSAGE, postTextCB: postTextCB}) as const
