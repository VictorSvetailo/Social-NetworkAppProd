import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';
import {
    followChange,
    pages,
    setCurrentPage,
    setIsFetching,
    setUsers,
    UsersType
} from '../redux/users-reducer';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from '../common/Preloader/Preloader';


export class UsersContainer extends React.Component<UsersPropsType, any> {

    componentDidMount() {
        this.props.setIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.pages(response.data.totalCount)
            })
    }

    onClickCurrentPage = (currentPage: number) => {
        this.props.setIsFetching(true)
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }


    render() {
        const pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        const pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        const onClickFollowHandler = (userID: string) => {
            this.props.followChange(userID)
        }

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users
                    currentPage={this.props.currentPage}
                    usersData={this.props.users}
                    pages={pages}
                    onClickCurrentPage={this.onClickCurrentPage}
                    onClickFollow={onClickFollowHandler}
                    //preloaderTest={this.preloaderTest}
                    // isFetching={this.props.isFetching}
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
}
//
type MapDispatchPropsType = {
    followChange: (userID: string) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    pages: (totalCount: number) => void
    setIsFetching: (isFetching: boolean) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, {
    followChange,
    setUsers,
    setCurrentPage,
    pages,
    setIsFetching,
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

