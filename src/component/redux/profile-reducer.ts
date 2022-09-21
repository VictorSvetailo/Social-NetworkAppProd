import {v1} from 'uuid';


const ADD_POST = 'ADD-POST';
const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';


export type PostsType = {
    id: string
    message: string
    likesCount: number
}

const initialState = {
    messageForNewPost: '',
    posts: [
        {id: v1(), message: 'Hi, how are you?', likesCount: 12},
        {id: v1(), message: 'It\'s my first post', likesCount: 5},
        {id: v1(), message: 'I will succeed!', likesCount: 21},
        {id: v1(), message: 'I\'m Victor', likesCount: 13},

    ] as Array<PostsType>,
}

export type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: v1(), message: action.postText, likesCount: 0};
            const copyState = {...state}
            copyState.posts = [...state.posts]
            copyState.posts.push(newPost);
            copyState.messageForNewPost = '';
            return copyState;
        case CHANGE_NEW_TEXT:
            return {...state, messageForNewPost: action.newText};
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

