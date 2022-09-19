import {v1} from 'uuid';
import {PostsType, PostsType2} from './state';

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


export const dialogsReducer = (state: any, action: any) => {

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
