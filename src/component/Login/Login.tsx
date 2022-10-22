import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import styles from './Login.module.css'
import {AppStateType} from '../../redux/redux-store';





type LoginFormOwnType = { captchaUrl: string | null }

const maxLength5 = maxLengthCreator(30)

// InjectedFormProps это типизация для redux-form придет именно из InjectedFormProps
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnType> & LoginFormOwnType>  = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormPropertiesType>('Email', 'email', [required, maxLength5], Input)}
            {createField<LoginFormPropertiesType>('Password', 'password', [required, maxLength5], Input, {type: 'password'})}
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
    // a unique name for the form
    form: 'login'
})(LoginForm)

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropertiesType =  Extract<keyof LoginFormDataType, string>    //'captcha' | 'rememberMe' | 'email' | 'password'

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
const Login: FC<MapDispatchPropsType & MapStateToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)




