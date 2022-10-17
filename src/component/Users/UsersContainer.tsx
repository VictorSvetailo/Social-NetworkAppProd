import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingInProgress, unFollow,

} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers,
} from '../../redux/users-selectors';


export class UsersContainer extends React.Component<UsersPropsType, any> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onClickCurrentPage = (currentPage: number,) => {
        const {pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }


    render() {
        // const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        // const pages = []
        // for (let i = 1; i <= pagesCount; i++) {
        //     pages.push(i)
        // }
        const onClickFollowHandler = (userID: string) => {
            this.props.follow(userID)
        }
        const onClickUnFollowHandler = (userID: string) => {
            this.props.unFollow(userID)
        }
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    currentPage={this.props.currentPage}
                    usersData={this.props.users}
                    onClickCurrentPage={this.onClickCurrentPage}
                    followingInProgress={this.props.followingInProgress}
                    follow={onClickFollowHandler}
                    unFollow={onClickUnFollowHandler}
                    pageSize={this.props.pageSize}
                    totalUsersCount={this.props.totalUsersCount}
                    // totalUsersCount={props.totalUsersCount}
                />
            </>

        );
    }
}


type MapStatePropsType = {
    users: any
    pageSize: number
    totalUsersCount: any
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}

type MapDispatchPropsType = {
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    setCurrentPage: (currentPage: number) => void
    toggleFollowingInProgress: (userID: string, isFetching: any) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

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


export default compose<React.ComponentType>(
    WithAuthRedirect,
    connect(mapStateToProps, {follow, unFollow, setCurrentPage, toggleFollowingInProgress, getUsers: requestUsers}),
)(UsersContainer)


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


