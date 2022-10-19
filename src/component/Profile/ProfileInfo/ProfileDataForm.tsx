import React from 'react';
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls';
import {reduxForm} from 'redux-form';
import styles from '../../Login/Login.module.css';


// @ts-ignore
export const ProfileDataForm = ({handleSubmit, profile, error}) => {

    // const errorCB = (error: boolean)=>{
    //     formError(error)
    // }

    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>
            <div>
                {error && <div className={styles.formSummaryError}>{error}</div>}
            </div>
            <div>
                <b>Full name:</b> {createField('Full name', 'fullName', [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b>{createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <b>About me:</b> {createField('About me', 'aboutMe', [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b>
                {
                    Object.keys(profile.contacts).map(key => {
                        return (
                            <div key={key}>
                                <b>{key} : {createField(key, 'contacts.' + key, [], Input)}</b>
                            </div>
                        )
                    })}
            </div>
        </form>
    );
};

// @ts-ignore
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm
