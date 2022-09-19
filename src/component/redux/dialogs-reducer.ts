import {v1} from 'uuid';
import {PostsType, PostsType2} from './store';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


const initialState = {
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
        {id: v1(), message: 'My name is Victor'},
        {id: v1(), message: 'How are you?'},
        {id: v1(), message: 'Hello'},
        {id: v1(), message: 'From Russia with love'},
        {id: v1(), message: 'Whats new?'},
        {id: v1(), message: '--Hi Yo'},
    ],
}

export const dialogsReducer = (state = initialState, action: any) => {

    switch (action.type){
        case UPDATE_NEW_MESSAGE_BODY:
            state.messageForCB = action.text
            return state;
        case SEND_MESSAGE:
            const newPostText: PostsType2 = {
                id: v1(),
                // message: postTextCB,
                message: state.messageForCB,
            }
            state.messages.push(newPostText)
            state.messageForCB = ''
            return state;
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

export const addNewTextCBAC = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        text: text
    } as const
}
export const postTextCBAC = (postTextCB: string) =>
    ({type: SEND_MESSAGE, postTextCB: postTextCB}) as const
