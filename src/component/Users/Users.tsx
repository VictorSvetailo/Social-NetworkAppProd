import React from 'react';
import styles from './Users.module.css'
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {UsersType} from '../../types/types';
import {FilterType, FollowingInProgress} from '../../redux/users-reducer';
import {UsersSearchForm} from './UsersSearchForm';

type PropsType = {
    usersData: Array<UsersType>
    currentPage: number
    onClickCurrentPage: (currentPage: number) => void
    followingInProgress: Array<FollowingInProgress>
    follow: (userID: string) => void
    unFollow: (userID: string) => void
    totalUsersCount: number
    pageSize: number
    onFilterChanged: (filter: FilterType) => void
}

export const Users: React.FC<PropsType> = ({usersData, currentPage, onClickCurrentPage, onFilterChanged, ...props}) => {

    return (
        <div className={styles.container}>
            users will be here
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
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



