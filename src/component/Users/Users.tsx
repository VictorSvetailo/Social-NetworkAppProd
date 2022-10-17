import React from 'react';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import {UsersSearchForm} from './UsersSearchForm';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';


type PropsType = {
    // pages: Array<any>
    usersData: Array<any>
    currentPage: any
    onClickCurrentPage: (currentPage: number) => void
    followingInProgress: any
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    totalUsersCount: any
    pageSize: any
    // totalUsersCount: any


}

export const Users: React.FC<PropsType> = ({usersData, currentPage, onClickCurrentPage, ...props}) => {


    return (
        <div className={styles.container}>
            users will be here
            <UsersSearchForm/>
            <br/>
            <hr/>
            <div>
                <Paginator
                    currentPage={currentPage}
                    onClickCurrentPage={onClickCurrentPage}
                    totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                />

            </div>
            <hr/>
            {usersData.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unFollow={props.unFollow}
                />
            )}
        </div>
    );
}