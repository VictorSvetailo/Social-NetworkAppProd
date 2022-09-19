import React from 'react';
import styles from './Post.module.css'
import {PostsType} from '../../../redux/store';
// import {PostsType} from '../../../redux/state'

type PostsAllType = {
    posts: Array<PostsType>;
}

export function Post(props: PostsAllType){
    return (
            <div className={styles.items}>
                {
                    props.posts.map((p) => {
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
