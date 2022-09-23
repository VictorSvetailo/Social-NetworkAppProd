import React, {MouseEvent} from 'react';
import styles from './Users.module.css'


type PropsType = {
    pages: Array<any>
    usersData: Array<any>
    currentPage: any
    onClickCurrentPage: (currentPage: number) => void
    onClickFollow:  (userID: string) => void
    //preloaderTest: any

}

export function Users(props: PropsType) {

    const page = props.pages.map( (p,i) =>  {
        return <span key={i} className={props.currentPage === p ? `${styles.active__value}` : `${styles.span__value}`}
                     onClick={(e) => {
                         props.onClickCurrentPage(p)}}
        >{p}</span>
    })

    const usersData = props.usersData.map(u => {
        const onClickFollowHandler = (e: MouseEvent<HTMLButtonElement>) => {
            props.onClickFollow(u.id)
        }
        return (
            <div key={u.id}>
                <img src={u.photos.small ? u.photos.small : 'https://cutt.ly/4Vc1Wmz'} alt="" width="50px"/>
                <button onClick={onClickFollowHandler}>{u.followed ? 'follow' : 'unfollow'}</button>
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