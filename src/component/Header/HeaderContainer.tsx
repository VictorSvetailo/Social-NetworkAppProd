import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {getAuthMe, logout} from '../../redux/auth-reducer';
import {AppStateType} from '../../redux/redux-store';


class HeaderContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {this.props.getAuthMe()}

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
    getAuthMe: () => void
    logout: () => void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, {getAuthMe, logout})(HeaderContainer)
