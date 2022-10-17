import React, {ChangeEvent} from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {Profile} from '../Profile';
import {ProfileStatus} from './ProfileStatus';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';

type PropsType = {
    profile: any
    status: any
    updateStatus: (status: any) => void
    isOwner: any
    savePhoto: (file: any) => void
}


export const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, ...props}) => {
    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }

    }

    return (
        <div>

            <div className={styles.image}>
                <img
                    src="https://inlnk.ru/Pm5348"
                    alt=""/>
            </div>
            <div className={styles.block}>
                <div className={styles.profile__image}>
                    <img src={profile.photos.large || 'https://inlnk.ru/4y0VkP'} alt=""/>
                </div>
                {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
            {/*<h2>{props.profile.fullName}</h2>*/}
            {/*<div>{props.profile.aboutMe}</div>*/}
            {/*<div>{props.profile.lookingForAJobDescription}</div>*/}
            <a href="https://github.com">{profile.contacts.github}</a>
            <h1>Hello Lorem ipsum dolor sit amet. </h1>
            <div><i>Hello Victor</i></div>
        </div>
    );
};

