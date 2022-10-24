import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import ProfileDataFormReduxForm, {ProfileDataForm} from './ProfileDataForm';
import {ContactsType, ProfileType, saveProfile} from '../../../redux/profile-reducer';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean | undefined
    savePhoto: (file: File) => void
    saveProfile: (profileInfo: ProfileType) => Promise<any>
}

export const ProfileInfo: React.FC<PropsType> =
    ({profile, status, updateStatus, isOwner, savePhoto, saveProfile, ...props
    }) => {const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(!editMode)
            }
        )
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
                {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            </div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                    setEditMode(!editMode)}}/>
            }
            <a href="https://github.com">{profile.contacts.github}</a>
            <h1>Hello Lorem ipsum dolor sit amet. </h1>
            <div><i>Hello Victor</i></div>
        </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean | undefined
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>My professional skills:</b> {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b>
                {
                    Object
                        .keys(profile.contacts)
                        .map(key => {
                        return (
                            <div key={key}>
                                <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
};


type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}, ...props) => {
    return (
        <div>
            <b>{contactTitle}:</b> {contactValue}
        </div>
    );
};


