import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import styles from './Login.module.css'
import {AppStateType} from '../../redux/redux-store';



type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    email: string
    captcha: string
}

const maxLength5 = maxLengthCreator(30)
// @ts-ignore
// InjectedFormProps это типизация для redux-form придет именно из InjectedFormProps
// {handleSubmit, error, captchaUrl}
const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (captchaUrl, props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField('Email', 'email', [required, maxLength5], Input)}
            {createField('Password', 'password', [required, maxLength5], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={props.captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            <div>
                {props.error && <div className={styles.formSummaryError}>{props.error}</div>}
            </div>

            <button>Login</button>
        </form>
    );
};


const LoginReduxForm = reduxForm<FormDataType>({
    // a unique name for the form
    form: 'login'
})(LoginForm)


const Login: FC<LoginAllType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
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
                // @ts-ignore
                captchaUrl={props.captchaUrl}/>
        </div>
    );
};

type MapDispatchPropsType = {
    login: (email: any, password: any, rememberMe: any, captcha: string) => void
}

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string
}

type LoginAllType = MapDispatchPropsType & MapStateToPropsType

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect((mapStateToProps), {login})(Login)




