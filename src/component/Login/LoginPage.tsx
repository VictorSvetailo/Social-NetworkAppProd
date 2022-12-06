import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, GetStringKeys, Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';
import {useSelector} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import styles from './Login.module.css'
import {AppStateType, useAppDispatch} from '../../redux/redux-store';


const maxLength = maxLengthCreator(30)

// InjectedFormProps это типизация для redux-form придет именно из InjectedFormProps
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnType> & LoginFormOwnType>  = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormPropertiesType>('Email', 'email', [required, maxLength], Input)}
            {createField<LoginFormPropertiesType>('Password', 'password', [required, maxLength], Input, {type: 'password'})}
            {createField<LoginFormPropertiesType>(undefined, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt={"captcha"}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            <div>
                {error && <div className={styles.formSummaryError}>{error}</div>}
            </div>

            <button>Login</button>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnType>({
    form: 'login'
})(LoginForm)

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginFormPropertiesType =  GetStringKeys<LoginFormDataType>    //'captcha' | 'rememberMe' | 'email' | 'password'

export const LoginPage: React.FC = (props) => {

    const captchaURL = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useAppDispatch()

    const onSubmit = (formData: LoginFormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaURL}/>
        </div>
    );
};






export type LoginFormOwnType = { captchaUrl: string | null }
