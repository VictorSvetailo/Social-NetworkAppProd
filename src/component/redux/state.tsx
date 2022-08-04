import React from 'react';
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

type SidebarType = {}


let state: RootStateType = {

    profilePage: {
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
    sidebar: {},
}


export default state;