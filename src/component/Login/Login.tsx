import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {maxLengthCreator, required} from '../../utils/validaters/validators';


const maxLength5 = maxLengthCreator(5)
export const LoginForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field placeholder={'Login'} name={'login'} validate={[required, maxLength5]} component={Input}/></div>
            <div><Field placeholder={'Password'} name={'password'} validate={[required, maxLength5]} component={Input}/></div>
            <div><Field name={'rememberMe'} type="checkbox" validate={[required]} component={Input} /> remember me</div>
            <div><button>Login</button></div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)



export const Login = () => {
    const onSubmit = (formData: any) => {
        console.log(formData)
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};




