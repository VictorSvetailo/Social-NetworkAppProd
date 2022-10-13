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
const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required, maxLength5], Input)}
            {createField('Password', 'password', [required, maxLength5], Input, {type: 'password'})}
            {createField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
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
})(LoginForm)


const Login: FC<LoginAllType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

type MapDispatchPropsType = {
    login: (email: any, password: any, rememberMe: any) => void
}

type mapStateToPropsType = {
    isAuth: boolean
}

type LoginAllType = MapDispatchPropsType & mapStateToPropsType

const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth
})

export default connect((mapStateToProps), {login})(Login)




