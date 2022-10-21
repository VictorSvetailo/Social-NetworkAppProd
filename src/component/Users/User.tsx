import React from 'react';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import {FollowingInProgress} from '../../redux/users-reducer';
import {UsersType} from '../../types/types';


type PropsType = {
    user: UsersType
    followingInProgress: Array<FollowingInProgress>
    follow: (userID: string) => void
    unFollow: (userID: string) => void

}

export const User: React.FC<PropsType> = ( {user, followingInProgress, unFollow, follow, ...props}) => {
       const usersDataInter =  (
            <div key={user.id}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small ? user.photos.small : 'https://cutt.ly/4Vc1Wmz'} alt="" width="50px"/>
                </NavLink>
                {
                    user.followed
                        ? <button disabled={followingInProgress.some((id: any) => id === user.id)}
                                  onClick={() => {
                                      unFollow(user.id)
                                  }}>Unfollow</button>
                        : <button disabled={followingInProgress.some((id: any) => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</button>
                }
                <span> {user.name}</span>
                <span>{user.status}</span>
            </div>
    )


    return (
        <div className={styles.container}>
            {usersDataInter}
        </div>
    );
}