import {v1} from 'uuid';
import {usersAPI} from '../api/api';


const FOLLOW_CHANGE = 'FOLLOW_CHANGE';
const UN_FOLLOW_CHANGE = 'UN_FOLLOW_CHANGE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE ';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


export type UsersType = {
    id: string
    photos: { small: string, large: string }
    name: string
    followed: boolean
    status: string
    //location: UsersLocationType
}


const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<FollowingInProgress>
}

export type FollowingInProgress = {
    id: number
}
// }

// export type FollowingInProgress = {
//     id: number
//     followingInProgress: boolean
//
// }

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW_CHANGE:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UN_FOLLOW_CHANGE:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
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
        case TOGGLE_IS_FETCHING : {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)
            }
        }
        default:
            return {...state};
    }

}
export const followSuccess = (userID: string) => {
    return {
        type: FOLLOW_CHANGE,
        userID: userID
    } as const
}
export const unFollowSuccess = (userID: string) => {
    return {
        type: UN_FOLLOW_CHANGE,
        userID: userID
    } as const
}

export const setUsers = (users: Array<UsersType>) => {
    return {
        type: SET_USERS,
        users: users
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: currentPage
    } as const
}

export const pages = (totalCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount: totalCount
    } as const
}
export const setIsFetching = (isFetching: boolean) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching: isFetching
    } as const
}

export const toggleFollowingInProgress = (userID: any, isFetching: any) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        userID: userID,
        isFetching: isFetching
    } as const
}


export const requestUsers = (page: any, pageSize: any) => {
    return (dispatch: any) => {
        dispatch(setIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(setIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(pages(data.totalCount))
        })
    }
}

export const follow = (userID: string) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingInProgress(userID, true))
        usersAPI.follow(userID)
            .then(response => {
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userID))
                }
                dispatch(toggleFollowingInProgress(userID, false))
            })
    }
}

export const unFollow = (userID: string) => {
    return (dispatch: any) => {
        dispatch(toggleFollowingInProgress(userID, true))
        usersAPI.unFollow(userID)
            .then(response => {
                if (response.data.resultCode == 0) {
                   console.log('hello')
                    dispatch(unFollowSuccess(userID))
                }
                dispatch(toggleFollowingInProgress(userID, false))
            })
    }
}



