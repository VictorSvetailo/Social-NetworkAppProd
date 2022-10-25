import React from 'react';
import {useSelector} from 'react-redux';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {getIsFetching} from '../../redux/users-selectors';


type UsersPagePropsType = {}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return (
        <div>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </div>

    );
}













// type MapStatePropsType = {
//     users: Array<UsersType>
//     pageSize: number
//     totalUsersCount: number
//     currentPage: number
//     isFetching: boolean
//     followingInProgress:  any // Array<FollowingInProgress>
//     filter: FilterType
//
// }
// type MapDispatchPropsType = {
//     follow: (userID: string) => void
//     unFollow: (userID: string) => void
//     setCurrentPage: (currentPage: number) => void
//     toggleFollowingInProgress: (userID: string, isFetching: boolean) => void
//     getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
// }
// export type UsersPropsType = MapStatePropsType & MapDispatchPropsType
//
// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         filter: getUsersFilter(state),
//     }
// }
//
// export default compose<React.ComponentType>(
//     WithAuthRedirect,
//     connect(mapStateToProps, {follow, unFollow, getUsers: requestUsers}))(UsersContainer)
//







// Старый вариант!
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         onClickFollowChange: (userID: string) => {
//             dispatch(followChangeAC(userID))
//         },
//         setUsers: (users: Array<UsersType>) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (currentPage: number) => {
//             dispatch(currentPageAC(currentPage))
//         },
//         setTotalUsersCount: (totalCount: number) => {
//             dispatch(pagesAC(totalCount))
//         },
//         isFetchingCB: (isFetching: boolean) => {
//             dispatch(setIsFetchingAC(isFetching))
//         },
//     }
// }





// const mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }


// export default WithAuthRedirect(connect(mapStateToProps, {
//     follow,
//     unFollow,
//     setCurrentPage,
//     toggleFollowingInProgress,
//     getUsers,
// })(UsersContainer));



