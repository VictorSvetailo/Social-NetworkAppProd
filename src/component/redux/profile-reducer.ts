import {v1} from 'uuid';
import {PostsType, PostsType2, RootStateType} from './state';

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';

export const profileReducer = (state: any, action: any) => {
    switch (action.type) {
        case ADD_POST:
            if (action.postText.trim() !== '') {
                let newPost: PostsType = {
                    id: v1(),
                    // message: this._state.profilePage.messageForNewPost,
                    message: action.postText,
                    likesCount: 0
                };

                state.posts.push(newPost);
                state.messageForNewPost = '';
            }
            return state;

        case CHANGE_NEW_TEXT:
            state.messageForNewPost = action.newText;
            return state;
        default:
            return state;
    }


// Условие 2 вариант
//     if (action.type === ADD_POST) {
//         debugger
//         if (action.postText.trim() !== '') {
//             const newPost: PostsType = {
//                 id: v1(),
//                 // message: this._state.profilePage.messageForNewPost,
//                 message: action.postText,
//                 likesCount: 0
//             }
//             state.posts.push(newPost)
//             state.messageForNewPost = ''
//         }
//     } else if (action.type === CHANGE_NEW_TEXT) {
//         state.messageForNewPost = action.newText
//     }
//     return state;
}
export const addPostAC = (postText: string) => {
    return {
        type: ADD_POST,
        postText: postText
    } as const
}
export const changedNewTextAC = (newText: string) =>
    ({type: CHANGE_NEW_TEXT, newText: newText}) as const

