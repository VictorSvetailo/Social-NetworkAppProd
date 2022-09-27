import {v1} from 'uuid';
import {addNewTextCBAC, dialogsReducer, postTextCBAC} from './dialogs-reducer';
import {addPostAC, changedNewTextAC, profileReducer} from './profile-reducer';

// const ADD_POST = 'ADD-POST';
// const CHANGE_NEW_TEXT = 'CHANGE-NEW-TEXT';
// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
// const SEND_MESSAGE = 'SEND-MESSAGE';


type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


type PostsType = {
    id: string
    message: string
    likesCount: number
}

type PostsType2 = {
    id: string
    message: string
}

type ProfilePageType = {
    messageForNewPost: string
    posts: Array<PostsType>
}


type DialogsType = {
    id: number
    name: string
}
type MessagesType = {
    id: string
    message: string
}
type DialogsPageType = {
    dialogs: Array<DialogsType>
    messageForCB: string
    messages: Array<MessagesType>
}

// ---------- stateMy ----------


export type SidebarType = {
    title: string
    adminData: Array<AdminDataItemsType>
    menuTitle: Array<MenuTitleItemsType>
    companyEmployees: Array<CompanyEmployeesType>
}
type AdminDataItemsType = {
    id: string
    photo: any
    name: string
    role: string
    status: boolean
}

type MenuTitleItemsType = {
    id: string
    url: string
    title: string
    status: boolean
}

type CompanyEmployeesType = {
    id: string
    name: string
    photo: string
    position: string
}
// ---------- stateMy ----------


// export const addPost = (postText: string) => {
//     if (postText.trim() !== '') {
//         const newPost: PostsType = {
//             id: v1(),
//             message: state.profilePage.messageForNewPost,
//             //message: postText,
//             likesCount: 0
//         }
//         state.profilePage.posts.push(newPost)
//         state.profilePage.messageForNewPost = ''
//         renderTree()
//     }
// }

//
// export const changeNewText = (newText: string) => {
//     state.profilePage.messageForNewPost = newText
//     renderTree()
// }


type StoreType = {
    _state: RootStateType
    //addPostCB: (postTextCB: string) => void
    //addNewTextCB: (postText: string) => void
    _callSubscribe: () => void
    subscribe: (observer: any) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}


// type AddPostActionType = {
//     type: 'ADD-POST'
//     postText: string
// }

export type ActionsTypes = ReturnType<typeof addPostAC>
    | ReturnType<typeof changedNewTextAC>
    | ReturnType<typeof addNewTextCBAC>
    | ReturnType<typeof postTextCBAC>

// export const addPostAC = (postText: string) => {
//     return {
//         type: ADD_POST,
//         postText: postText
//     } as const
// }
// export const changedNewTextAC = (newText: string) =>
//     ({type: CHANGE_NEW_TEXT, newText: newText}) as const
//
// export const addNewTextCBAC = (text: string) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_BODY,
//         text: text
//     } as const
// }
// export const postTextCBAC = (postTextCB: string) =>
//     ({type: SEND_MESSAGE, postTextCB: postTextCB}) as const


const store: StoreType = {
    _state: {
        profilePage: {
            messageForNewPost: '',
            posts: [
                {id: v1(), message: 'Hi, how are you?', likesCount: 12},
                {id: v1(), message: 'It\'s my first post', likesCount: 5},
                {id: v1(), message: 'I will succeed!', likesCount: 21},
                {id: v1(), message: 'I\'m Victor', likesCount: 13},

            ]
        },
        dialogsPage: {
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
        },
        // ---------- stateMy ----------
        sidebar: {
            title: 'Personal account',
            adminData: [
                {
                    id: v1(), photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    name: 'Tatiana Ivanova', role: 'Administrator', status: false
                }
            ],
            menuTitle: [
                {id: v1(), url: '/profile', title: 'Profile', status: true},
                {id: v1(), url: '/dialogs', title: 'Message', status: true},
                {id: v1(), url: '/users', title: 'Users', status: true},
                {id: v1(), url: '/news', title: 'News', status: true},
                {id: v1(), url: '/doctors', title: 'Doctors', status: true},
                {id: v1(), url: '/patients', title: 'Patients', status: true},
                {id: v1(), url: '/services', title: 'Services', status: true},
            ],
            companyEmployees: [
                {
                    id: v1(),
                    name: 'Victor',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
                {
                    id: v1(),
                    name: 'Roma',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
                {
                    id: v1(),
                    name: 'Max',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
                {
                    id: v1(),
                    name: 'Valera',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
                {
                    id: v1(),
                    name: 'Sasha',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
                {
                    id: v1(),
                    name: 'Nastya',
                    photo: 'https://imageup.ru/img238/4000211/1-4d137341-2db8-49c6-83de-e8ef75519d43.jpg',
                    position: 'Boss'
                },
            ]
        }
    },
    _callSubscribe() {
        console.log('State is changed')
    },

    subscribe(observer: any) {
        this._callSubscribe = observer
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        // this._state.profilePage = profileReducer(this._state.profilePage, action)
        // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        // this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        // this._callSubscribe()
        // if (action.type === ADD_POST) {
        //     if (action.postText.trim() !== '') {
        //         const newPost: PostsType = {
        //             id: v1(),
        //             // message: this._state.profilePage.messageForNewPost,
        //             message: action.postText,
        //             likesCount: 0
        //         }
        //         this._state.profilePage.posts.push(newPost)
        //         this._state.profilePage.messageForNewPost = ''
        //         this._callSubscribe()
        //     }
        // } else if (action.type === CHANGE_NEW_TEXT) {
        //     this._state.profilePage.messageForNewPost = action.newText
        //     this._callSubscribe()
        // } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
        //     this._state.dialogsPage.messageForCB = action.text
        //     this._callSubscribe()
        // } else if (action.type === SEND_MESSAGE) {
        //     const newPostText: PostsType2 = {
        //         id: v1(),
        //         // message: postTextCB,
        //         message: this._state.dialogsPage.messageForCB,
        //     }
        //     this._state.dialogsPage.messages.push(newPostText)
        //     this._state.dialogsPage.messageForCB = ''
        //     this._callSubscribe()
        // }
        // changeNewText(newText: string) {
        //     this._state.profilePage.messageForNewPost = newText
        //     this._callSubscribe()
        // },
        // addPost(postText: string) {
        //     if (postText.trim() !== '') {
        //         const newPost: PostsType = {
        //             id: v1(),
        //             message: this._state.profilePage.messageForNewPost,
        //             //message: postText,
        //             likesCount: 0
        //         }
        //         this._state.profilePage.posts.push(newPost)
        //         this._state.profilePage.messageForNewPost = ''
        //         this._callSubscribe()
        //     }
        // },
        // addNewTextCB(text: string) {
        //     console.log(text)
        //     store._state.dialogsPage.messageForCB = text
        //     store._callSubscribe()
        //
        // },
        // addPostCB(postTextCB: string) {
        //     if (postTextCB.trim() !== '') {
        //         const newPostText: PostsType2 = {
        //             id: v1(),
        //             // message: postTextCB,
        //             message: store._state.dialogsPage.messageForCB,
        //         }
        //         store._state.dialogsPage.messages.push(newPostText)
        //         store._state.dialogsPage.messageForCB = ''
        //         store._callSubscribe()
        //     }
        // },
    }
}

export default store





