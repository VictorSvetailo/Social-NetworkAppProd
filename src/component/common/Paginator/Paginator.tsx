import React, {useState} from 'react';
import styles from './Paginator.module.css'


type PropsType = {
    currentPage?: any
    onClickCurrentPage: (currentPage: number) => void
    totalUsersCount: any
    pageSize: any
}


export const Paginator: React.FC<PropsType> = (props: PropsType) => {
    const portionSize = 10

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={(styles.paginator)}>
        { portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

        {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
            .map((p) => {
                return <span className={props.currentPage === p ? `${styles.active__value}` : `${styles.span__value}`}
                             key={p}
                             onClick={(e) => {
                                 props.onClickCurrentPage(p);
                             }}>{p}</span>
            })}
        { portionCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


    </div>
}
