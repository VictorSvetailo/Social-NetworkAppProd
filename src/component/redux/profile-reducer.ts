import {v1} from 'uuid';
import {PostsType, PostsType2, RootStateType} from './store';

const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 5},
        {id: v1(), message: 'I will succeed!', likesCount: 21},
        {id: v1(), message: 'I\'m Victor', likesCount: 13},

    ]
}

export const profileReducer = (state = initialState, action: any) => {
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
            return {...state,messageForNewPost: action.newText};
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

