import {UsersType} from '../types/types';
import {actions, InitialStateType, usersReducer} from './users-reducer';
import {v1} from 'uuid';


const userAllIDTest = {
    id1: v1(),
    id2: v1(),
    id3: v1(),
    id4: v1(),
}

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: userAllIDTest.id1, name: 'Victor 1',
                followed: false,
                photos: {small: null, large: null},
                status: 'status 1'
            },
            {
                id: userAllIDTest.id2,
                name: 'Victor 2',
                followed: true, photos: {small: null, large: null},
                status: 'status 2'
            },
            {
                id: userAllIDTest.id3,
                name: 'Victor 3',
                followed: true,
                photos: {small: null, large: null},
                status: 'status 3'
            },
            {
                id: userAllIDTest.id4,
                name: 'Victor 4',
                followed: true,
                photos: {small: null, large: null},
                status: 'status 4'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: "",
            friend: null as null | boolean
        },
    }
})


test('checking a user\'s subscription', () => {
    const newState = usersReducer(state, actions.followSuccess(userAllIDTest.id1))

    expect(newState.users[0].followed).toBe(true)
    expect(newState.users[1].followed).toBeTruthy()

})

test('subscription from the user', () => {
    const newState = usersReducer(state, actions.unFollowSuccess(userAllIDTest.id4))

    expect(newState.users[0].followed).toBe(false)
    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[3].name).toBe("Victor 4")


})