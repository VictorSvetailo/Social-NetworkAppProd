import {v1} from 'uuid';

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}


export type PostsType = {
    id: string
    message: string
    likesCount: number
}
type ProfilePageType = {
    messageForNewPost: string
    posts: Array<PostsType>
}


export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
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
export type MenuTitleItemsType = {
    id: string
    url: string
    title: string
    status: boolean
}

export type CompanyEmployeesType = {
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


export type StoreType = {
    _state: RootStateType
    changeNewText: (newText: string) => void
    addPost: (postText: string) => void
    _callSubscribe: () => void
    subscribe: (observer: any) => void
    getState: () => RootStateType
    dispatch: (action: ActionsTypes) => void
}


type AddPostActionType = {
    type: 'ADD-POST'
    postText: string
}
type ChangeNewTextActionType = {
    type: 'CHANGE-NEW-TEXT'
    newText: string
}

export type ActionsTypes =  AddPostActionType | ChangeNewTextActionType

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
            messages: [
                {id: 1, message: 'My name is Victor'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Hello'},
                {id: 4, message: 'From Russia with love'},
                {id: 5, message: 'Whats new?'},
                {id: 6, message: 'Hi Yo'},
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
                {id: v1(), url: '/', title: 'Profile', status: true},
                {id: v1(), url: '/dialogs', title: 'Message', status: true},
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
    subscribe(observer: any) {
        this._callSubscribe = observer
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        if (action.type === 'ADD-POST') {
            if (action.postText.trim() !== '') {
                const newPost: PostsType = {
                    id: v1(),
                    // message: this._state.profilePage.messageForNewPost,
                    message: action.postText,
                    likesCount: 0
                }
                this._state.profilePage.posts.push(newPost)
                this._state.profilePage.messageForNewPost = ''
                this._callSubscribe()
            }
        }else if(action.type === 'CHANGE-NEW-TEXT'){
            this._state.profilePage.messageForNewPost = action.newText
            this._callSubscribe()
        }
    }

}

export default store





