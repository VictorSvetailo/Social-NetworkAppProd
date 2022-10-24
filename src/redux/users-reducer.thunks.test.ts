import {actions, follow, unFollow} from './users-reducer';
import {ResponseType, ResultCodeEnum} from '../api/api';
import {usersAPI} from '../api/users-api';
import {v1} from 'uuid';


const userAllIDTest = {
    id1: v1(),
    id2: v1(),
    id3: v1(),
    id4: v1(),
}

jest.mock('../api/users-api')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: ResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}


const dispatchMock = jest.fn()
const getStateMock = jest.fn()


beforeEach(()=>{
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test('success follow Thunk ', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(userAllIDTest.id1)


    await thunk(dispatchMock, getStateMock , {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(userAllIDTest.id1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(userAllIDTest.id1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(userAllIDTest.id1, false))

})

test('success unFollow Thunk ', async () => {

    userAPIMock.unFollow.mockReturnValue(Promise.resolve(result))
    const thunk = unFollow(userAllIDTest.id1)

    await thunk(dispatchMock, getStateMock , {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(userAllIDTest.id1, true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(userAllIDTest.id1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(userAllIDTest.id1, false))

})
