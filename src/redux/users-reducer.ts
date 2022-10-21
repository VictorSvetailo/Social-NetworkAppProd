import {v1} from 'uuid';
import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {Dispatch} from 'redux';
import {PhotosType, UsersType} from '../types/types';


const FOLLOW_CHANGE = 'FOLLOW_CHANGE';
const UN_FOLLOW_CHANGE = 'UN_FOLLOW_CHANGE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE ';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<FollowingInProgress> // array of users id
}

export type FollowingInProgress = {
    id: string
}

type InitialStateType = typeof initialState

type ActionType = FollowSuccessActionType
    | UnFollowSuccessActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | PagesActionType
    | SetIsFetchingActionType
    | ToggleFollowingInProgressActionType


export const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW_CHANGE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case UN_FOLLOW_CHANGE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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

            return <InitialStateType>{
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    // @ts-ignore
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        }
        default:
            return {...state};
    }

}


type FollowSuccessActionType = {
    type: typeof FOLLOW_CHANGE,
    userID: string
}
export const followSuccess = (userID: string): FollowSuccessActionType => {
    return {
        type: FOLLOW_CHANGE,
        userID: userID
    }
}

type UnFollowSuccessActionType = {
    type: typeof UN_FOLLOW_CHANGE,
    userID: string
}
export const unFollowSuccess = (userID: string): UnFollowSuccessActionType => ({type: UN_FOLLOW_CHANGE, userID})

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})


type PagesActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount: number
}
export const pages = (totalCount: number): PagesActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount})

type SetIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})


type ToggleFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    userID: string
    isFetching: boolean
}
export const toggleFollowingInProgress = (userID: string, isFetching: boolean)
    : ToggleFollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, userID, isFetching})


export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsFetching(true))
        dispatch(setCurrentPage(page))
        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(setIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(pages(data.totalCount))
    }
}

export const followUnFollowFlow = async (dispatch: Dispatch, userID: string, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingInProgress(userID, true))
    const response = await apiMethod(userID)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingInProgress(userID, false))
}

export const follow = (userID: string) => {
    return async (dispatch: Dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI)
        const actionCreator = followSuccess
        followUnFollowFlow(dispatch, userID, apiMethod, actionCreator)
    }
}

export const unFollow = (userID: string) => {
    return async (dispatch: Dispatch) => {
        followUnFollowFlow(dispatch, userID, usersAPI.unFollow.bind(usersAPI), unFollowSuccess)
    }
}



