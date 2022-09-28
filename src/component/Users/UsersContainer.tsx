import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    getUsers,
    setCurrentPage,
    toggleFollowingInProgress, unFollow,
    UsersType
} from '../../redux/users-reducer';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';


export class UsersContainer extends React.Component<UsersPropsType, any> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onClickCurrentPage = (currentPage: number,) => {
        this.props.getUsers(currentPage, this.props.pageSize)
        // this.props.setIsFetching(true)
        // this.props.setCurrentPage(currentPage)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         this.props.setIsFetching(false)
        //         this.props.setUsers(data.items)
        //     })
    }


    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
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
                    pages={pages}
                    onClickCurrentPage={this.onClickCurrentPage}
                    // onClickFollow={onClickFollowHandler}
                    // onClickUnFollow={onClickUnFollowHandler}
                    // toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                    followingInProgress={this.props.followingInProgress}
                    follow={onClickFollowHandler}
                    unFollow={onClickUnFollowHandler}
                />
            </>

        );
    }
}

type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: any
    currentPage: number
    isFetching: boolean
    followingInProgress: any
}

type MapDispatchPropsType = {
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    // setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    // pages: (totalCount: number) => void
    // setIsFetching: (isFetching: boolean) => void
    toggleFollowingInProgress: (userID: string, isFetching: any) => void
    getUsers: any
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    toggleFollowingInProgress,
    getUsers,
})(UsersContainer);


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


