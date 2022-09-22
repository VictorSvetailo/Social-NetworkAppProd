import React, {MouseEvent, useState} from 'react';
import {UsersPropsType} from './UsersContainer';
import {v1} from 'uuid';





export function Users(props: UsersPropsType){
    console.log('Rerender User')

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: v1(),
                image: 'https://cutt.ly/4Vc1Wmz',
                followed: true,
                fullName: 'Victor',
                status: 'I\'m work in Alfa Bank.',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: v1(),
                image: 'https://cutt.ly/4Vc1Wmz',
                followed: true,
                fullName: 'Dima',
                status: 'I\'m work in Alfa Bank.',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: v1(),
                image: 'https://cutt.ly/4Vc1Wmz',
                followed: false,
                fullName: 'Sergei',
                status: 'I\'m work in Alfa Bank.',
                location: {city: 'Moscow', country: 'Russia'}
            },
            {
                id: v1(),
                image: 'https://cutt.ly/4Vc1Wmz',
                followed: true,
                fullName: 'Andrew',
                status: 'I\'m work in Alfa Bank.',
                location: {city: 'Moscow', country: 'Russia'}
            },
        ])
    }

    const usersData = props.users.map(u => {
        const onClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.onClickFollowChange(u.id)
        }
        return (
            <div key={u.id}>
                <img src={u.image} alt="" width='50px'/>
                <button onClick={onClickFollowHandler}>{u.followed ? 'follow' : 'unfollow'}</button>
                <span> {u.fullName}</span>
                <span> {u.status}</span>
                <span> {u.location.country} {u.location.city}</span>
            </div>
        )
    })

    return (
        <div>
            users will be here
            {usersData}
        </div>
    );
};
