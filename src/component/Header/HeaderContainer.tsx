import React from 'react';
import {Header} from './Header';
import axios from 'axios';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';


class HeaderContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            })
    }


    render() {
        return (
            <div>
                <Header {...this.props}/>
            </div>

        );
    }
}

type MapStatePropsType = {
    isAuth: boolean
    login: any
}

type MapDispatchPropsType = {
    setAuthUserData: any
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType



const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)
