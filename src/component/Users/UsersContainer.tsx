import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from '../redux/redux-store';
import {currentPageAC, followChangeAC, pagesAC, setUsersAC, UsersType} from '../redux/users-reducer';
import axios from 'axios';
import {Users} from './Users';



export class UsersContainer extends React.Component<UsersPropsType, any> {

    // constructor(){
    //     super (props);
    //     alert("new object")
    //
    // }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.setCurrentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onClickCurrentPage = (currentPage: number) => {
        this.props.setCurrentPage(currentPage)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then(response => {
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
            this.props.onClickFollowChange(userID)
        }


        return (
            <Users currentPage={this.props.currentPage} usersData={this.props.users} pages={pages} onClickCurrentPage={this.onClickCurrentPage} onClickFollow={onClickFollowHandler}/>
        );
    }
}

type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    // messageForNewPost: string
}
//
type MapDispatchPropsType = {
    onClickFollowChange: (userID: string) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalCount: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickFollowChange: (userID: string) => {
            dispatch(followChangeAC(userID))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(currentPageAC(currentPage))
        },
        setTotalUsersCount: (totalCount: number) => {
            dispatch(pagesAC(totalCount))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

