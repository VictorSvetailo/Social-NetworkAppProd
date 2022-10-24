import React from 'react'
import styles from './Profile.module.css'
import {Profile} from './Profile';
import {
    getStatus,
    getUserProfile,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {ProfileFC} from './ProfileFC';
import {compose} from 'redux';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';


class ProfileContainer extends React.Component<ProfilePropsType> {

    refreshProfile() {
        const userID = this.props.id || '24789'
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: ProfilePropsType, prevState: ProfilePropsType) {
        if (this.props.id !== prevProps.id) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div className={styles.blocks}>
                <Profile
                    {...this.props}
                    isOwner={!this.props.id}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfile={this.props.saveProfile}
                />
            </div>
        )
    }
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserID: number | null
    isAuth: boolean
    isOwner?: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userID: string) => void
    getStatus: (userID: string) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profileInfo: ProfileType) => Promise<any>

}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & { id: string }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    ProfileFC,
    WithAuthRedirect
)(ProfileContainer)


// Старый способ вместо compose
// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)
// const WithParamsProfile = ProfileFC(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithParamsProfile)

// type PathParamsType = {
//     userID: string
// }
// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType