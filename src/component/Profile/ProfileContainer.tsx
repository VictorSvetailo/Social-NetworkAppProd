import React from 'react'
import styles from './Profile.module.css'
import {Profile} from './Profile';
import {getStatus, getUserProfile, updateStatus} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {ProfileFC} from './ProfileFC';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';
import {compose} from 'redux';


class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        let userID = this.props.id || '24789'
        this.props.getUserProfile(userID);
        // setTimeout(() => {
        // }, 10000)}
        //
        this.props.getStatus(userID);
    }

    render() {
        return (
            <div className={styles.blocks}>
                <Profile
                    {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}


type MapStatePropsType = {
    profile: null
    status: any
    authorizedUserID: any
    isAuth: any

}

type MapDispatchPropsType = {
    getUserProfile: (userID: any) => void
    getStatus: (userID: any) => void
    updateStatus: (status: string) => void

}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & { id?: string }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.id,
    isAuth: state.auth.isAuth
})


// Старый способ вместо compose
// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)
// const WithParamsProfile = ProfileFC(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithParamsProfile)


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),
    ProfileFC,
    // WithAuthRedirect
)(ProfileContainer)


// type PathParamsType = {
//     userID: string
// }

// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType