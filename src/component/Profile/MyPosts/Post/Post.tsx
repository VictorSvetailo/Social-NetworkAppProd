import React from 'react';
import styles from './Post.module.css'
import state from '../../../redux/state'

export function Post(){
    return (
            <div className={styles.items}>
                {
                    state.profilePage.posts.map((p, index) => {
                        return (
                            <div key={index} className={styles.item}>
                                <div className={styles.image}>
                                    <img src="https://inlnk.ru/G6y07y" alt=""/>
                                </div>
                                <p>{p.message}</p>
                            </div>
                        )
                    })
                }
            </div>
    );
};
