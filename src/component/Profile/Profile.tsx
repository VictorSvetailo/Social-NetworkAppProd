import React from 'react'
import styles from './Profile.module.css'
import {MyPosts} from './MyPosts/MyPosts';


// type messageType = {
//     message: string
// }

export function Profile() {
    return (
        <div className={styles.blocks}>
            <div className={styles.image}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0HRgL1DVlH6q-HD9FYAWyBf9nNRlAqnxWwA&usqp=CAU"
                    alt=""/>
            </div>
            <div className={styles.block}>
                <h1>Hello Lorem ipsum dolor sit amet. </h1>
                <div><i>Hello</i></div>
                <MyPosts/>
            </div>
        </div>

    );
};
