import React, {useEffect} from 'react';
import styles from './Users.module.css'
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {FilterType, follow, requestUsers, unFollow} from '../../redux/users-reducer';
import {UsersSearchForm} from './UsersSearchForm';
import {useSelector} from 'react-redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from '../../redux/users-selectors';
import {useAppDispatch} from '../../redux/redux-store';

type PropsType = {}

export const Users: React.FC<PropsType> = React.memo((props) => {




    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(requestUsers(currentPage, pageSize, filter))
    },[])

    const onClickCurrentPage = (currentPage: number) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followCB = (userID: string) => {
        dispatch(follow(userID))
    }
    const unFollowCB = (userID: string) => {
        dispatch(unFollow(userID));
    }

    return (
        <div className={styles.container}>
            users will be here
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <hr/>
            <div>
                <Paginator
                    currentPage={currentPage}
                    onClickCurrentPage={onClickCurrentPage}
                    totalUsersCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            <hr/>
            {users.map(u =>
                <User
                    key={u.id}
                    user={u}
                    followingInProgress={followingInProgress}
                    follow={followCB}
                    unFollow={unFollowCB}
                />
            )}
        </div>
    );
})



