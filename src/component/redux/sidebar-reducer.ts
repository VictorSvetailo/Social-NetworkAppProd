import {v1} from 'uuid';

const initialState = {
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


export const sidebarReducer = (state = initialState, action: any) => {

    return state;
}