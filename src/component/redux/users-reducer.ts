import {v1} from 'uuid';


const FOLLOW_CHANGE = 'FOLLOW_CHANGE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE ';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


export type UsersType = {
    id: string
    photos: {small: string, large: string}
    name: string
    followed: boolean
    status: string
    //location: UsersLocationType
}



// type UsersLocationType = {
//     city: string
//     country: string
// }

const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1
}

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW_CHANGE:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: !u.followed}
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE : {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT : {
            return {...state, totalUsersCount: action.totalCount}
        }
        default:
            return {...state};
    }

}
export const followChangeAC = (userID: string) => {
    return {
        type: FOLLOW_CHANGE,
        userID: userID
    } as const
}

export const setUsersAC = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users: users
    } as const
}

export const currentPageAC = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    } as const
}

export const pagesAC = (totalCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount: totalCount
    } as const
}
// export const changedNewTextAC = (newText: string) => {
//
// }

