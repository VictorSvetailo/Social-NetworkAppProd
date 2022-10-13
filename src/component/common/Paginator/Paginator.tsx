import React from 'react';
import styles from './Paginator.module.css'


type PropsType = {
    pages: Array<any>
    currentPage: any
    onClickCurrentPage: (currentPage: number) => void

}

export const Paginator: React.FC<PropsType> = ({pages, currentPage, onClickCurrentPage, ...props}) => {

    const page = pages.map((p, i) => {
        return <span key={i} className={currentPage === p ? `${styles.active__value}` : `${styles.span__value}`}
                     onClick={(e) => {
                         onClickCurrentPage(p)
                     }}
        >{p}</span>
    })

    return (
        <div className={styles.container}>
            <span>{page}</span>
        </div>
    );
};