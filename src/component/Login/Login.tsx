import React, {FC} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Navigate} from 'react-router-dom';


const maxLength5 = maxLengthCreator(30)
const LoginForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Email'} name={'email'} validate={[required, maxLength5]} component={Input}/></div>
            <div><Field placeholder={'Password'} name={'password'} type={'password'} validate={[required, maxLength5]} component={Input}/></div>
            <div><Field name={'rememberMe'} type="checkbox" validate={[required]} component={Input} /> remember me</div>
            <div><button>Login</button></div>
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

    if (props.isAuth){
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




