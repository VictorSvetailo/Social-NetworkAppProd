import React, {MouseEvent} from 'react';
import styles from './Users.module.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';


type PropsType = {
    pages: Array<any>
    usersData: Array<any>
    currentPage: any
    onClickCurrentPage: (currentPage: number) => void
    onClickFollow: (userID: string) => void
    onClickUnFollow: (userID: string) => void

}

export function Users(props: PropsType) {
    console.log('Rerender component')

    const page = props.pages.map((p, i) => {
        return <span key={i} className={props.currentPage === p ? `${styles.active__value}` : `${styles.span__value}`}
                     onClick={(e) => {
                         props.onClickCurrentPage(p)
                     }}
        >{p}</span>
    })

    const usersData = props.usersData.map(u => {
        // const onClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
        //     props.onClickFollow(u.id)
        // }
        return (
            <div key={u.id}>
                <NavLink to={'/profile/' + u.id}>
                    <img src={u.photos.small ? u.photos.small : 'https://cutt.ly/4Vc1Wmz'} alt="" width="50px"/>
                </NavLink>
                {
                    u.followed === true
                    ? <button onClick={() => {
                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                            withCredentials: true,
                            headers: {
                                'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
                            }
                        })
                            .then(response => {
                                if (response.data.resultCode === 0) {
                                    props.onClickUnFollow(u.id)
                                }
                            })
                    }}>Unfollow</button>
                    : <button onClick={() => {
                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                            withCredentials: true,
                            headers: {
                                'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
                            }
                        })
                            .then(response => {
                                if (response.data.resultCode == 0) {
                                    props.onClickFollow(u.id)
                                }
                            })
                    }}>Follow</button>
                }


                <span> {u.name}</span>
                <span> {u.status}</span>
            </div>
        )
    })


    return (
        <div className={styles.container}>
            users will be here
            <br/>
            <hr/>
            <div>
                <span>{page}</span>
            </div>
            <hr/>
            <br/>
            {usersData}
        </div>
    );
}