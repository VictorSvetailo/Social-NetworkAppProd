import {updateObjectInArray} from '../utils/object-helpers';
import {Dispatch} from 'redux';
import {UsersType} from '../types/types';
import {BaseThunkType, InferActionsTypes} from './redux-store';
import {usersAPI} from '../api/users-api';

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

export const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW_CHANGE':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case 'SN/USERS/UN_FOLLOW_CHANGE':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
            }
        case 'SN/USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'SN/USERS/SET_CURRENT_PAGE' : {
            return {...state, currentPage: action.currentPage}
        }
        case 'SN/USERS/SET_TOTAL_USERS_COUNT' : {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'SN/USERS/TOGGLE_IS_FETCHING' : {
            return {...state, isFetching: action.isFetching}
        }
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS' : {

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

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userID: string) => ({type: 'SN/USERS/FOLLOW_CHANGE', userID: userID}as const),
    unFollowSuccess: (userID: string) => ({type: 'SN/USERS/UN_FOLLOW_CHANGE', userID} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    pages: (totalCount: number) => ({type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalCount} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (userID: string, isFetching: boolean) => ({type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', userID, isFetching} as const)
}

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
type ThunkType = BaseThunkType<ActionsType>
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        const data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.setIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.pages(data.totalCount))
    }
}

export const _followUnFollowFlow = async (dispatch: Dispatch<ActionsType>,
                                          userID: string, apiMethod: any, actionCreator: (userID: string) => ActionsType) => {
    dispatch(actions.toggleFollowingInProgress(userID, true))
    const response = await apiMethod(userID)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleFollowingInProgress(userID, false))
}

export const follow = (userID: string): ThunkType => {
    return async (dispatch) => {
        const apiMethod = usersAPI.follow.bind(usersAPI)
        const actionCreator = actions.followSuccess
        await _followUnFollowFlow(dispatch, userID, apiMethod, actionCreator)
    }
}

export const unFollow = (userID: string): ThunkType => {
    return async (dispatch) => {
        await _followUnFollowFlow(dispatch, userID, usersAPI.unFollow.bind(usersAPI), actions.unFollowSuccess)
    }
}



