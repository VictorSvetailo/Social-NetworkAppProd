import React, {FC} from 'react';
import {Field, reduxForm} from 'redux-form';
import {createField, Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';
import styles from './Login.module.css'


const maxLength5 = maxLengthCreator(30)
// @ts-ignore
const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required, maxLength5], Input)}
            {createField('Password', 'password', [required, maxLength5], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            <div>
                {error && <div className={styles.formSummaryError}>{error}</div>}
            </div>

            <button>Login</button>
        </form>
    );
};


const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
    // @ts-ignore
})(LoginForm)


const Login: FC<LoginAllType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }


    // @ts-ignore
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

type mapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string
}

type LoginAllType = MapDispatchPropsType & mapStateToPropsType

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect((mapStateToProps), {login})(Login)




