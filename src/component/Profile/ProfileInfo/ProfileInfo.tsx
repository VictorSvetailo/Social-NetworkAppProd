import React from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';

type PropsType = {
    profile: any
    setUserProfile: (profile: string) => void
}

export function ProfileInfo(props: PropsType) {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>

            <div className={styles.image}>
                <img
                    src="https://inlnk.ru/Pm5348"
                    alt=""/>
            </div>
            <div className={styles.profile__image}>
                <img src={props.profile.photos.large} alt=""/>
            </div>
            <h2>{props.profile.fullName}</h2>
            <div>{props.profile.aboutMe}</div>
            <div>{props.profile.lookingForAJobDescription}</div>
            <a href='https://github.com'>{props.profile.contacts.github}</a>
            <h1>Hello Lorem ipsum dolor sit amet. </h1>
            <div><i>Hello Victor</i></div>
        </div>
    );
};

