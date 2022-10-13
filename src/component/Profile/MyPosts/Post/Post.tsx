import React from 'react';
import styles from './Post.module.css'

type PostsAllType = {
    posts: Array<any>;
}

export function Post(props: PostsAllType){
    return (
            <div className={styles.items}>
                {
                    [...props.posts].reverse().map((p) => {
                        return (
                            <div key={p.id} className={styles.item}>
                                <div className={styles.image}>
                                    <img src="https://inlnk.ru/G6y07y" alt=""/>
                                </div>
                                <p>{p.message}</p>
                                <p>{p.likesCount}</p>
                            </div>
                        )
                    })
                }
            </div>
    );
};
