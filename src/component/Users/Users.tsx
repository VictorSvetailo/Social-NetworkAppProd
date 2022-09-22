import React, {MouseEvent, useState} from 'react';
import {UsersPropsType} from './UsersContainer';
import axios from 'axios';
import {v1} from 'uuid';
import {UsersType} from '../redux/users-reducer';


export function Users(props: UsersPropsType) {
    console.log('Rerender User')
    const getUsers = () => {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.setUsers(response.data.items)
            })
    }


    // if (props.users.length === 0) {
    //     props.setUsers([
    //         {
    //             id: v1(),
    //             image: 'https://cutt.ly/4Vc1Wmz',
    //             followed: true,
    //             fullName: 'Victor',
    //             status: 'I\'m work in Alfa Bank.',
    //             location: {city: 'Moscow', country: 'Russia'}
    //         },
    //         {
    //             id: v1(),
    //             image: 'https://cutt.ly/4Vc1Wmz',
    //             followed: true,
    //             fullName: 'Dima',
    //             status: 'I\'m work in Alfa Bank.',
    //             location: {city: 'Moscow', country: 'Russia'}
    //         },
    //         {
    //             id: v1(),
    //             image: 'https://cutt.ly/4Vc1Wmz',
    //             followed: false,
    //             fullName: 'Sergei',
    //             status: 'I\'m work in Alfa Bank.',
    //             location: {city: 'Moscow', country: 'Russia'}
    //         },
    //         {
    //             id: v1(),
    //             image: 'https://cutt.ly/4Vc1Wmz',
    //             followed: true,
    //             fullName: 'Andrew',
    //             status: 'I\'m work in Alfa Bank.',
    //             location: {city: 'Moscow', country: 'Russia'}
    //         },
    //     ])
    // }

    const usersData = props.users.map(u => {
        const onClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.onClickFollowChange(u.id)
        }
        return (
            <div key={u.id}>
                <img src={u.photos.small ? u.photos.small : 'https://cutt.ly/4Vc1Wmz'} alt="" width="50px"/>
                <button onClick={onClickFollowHandler}>{u.followed ? 'follow' : 'unfollow'}</button>
                <span> {u.name}</span>
                <span> {u.status}</span>
                {/*<span> {u.location.country} {u.location.city}</span>*/}
            </div>
        )
    })

    return (
        <div>
            users will be here
            {usersData}
            <button onClick={getUsers}>Get Users</button>
        </div>
    );
};
