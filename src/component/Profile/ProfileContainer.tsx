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


class ProfileContainer extends React.Component<ProfilePropsType, any> {
    refreshProfile() {
        let userID = this.props.id || '24789'
        // if (!userID) {
        // // userID = this.props.authorizedUserID
        // //     if (!userID){
        // //         this.props.history.push('/login')
        // //     }
        // // }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfilePropsType>, prevState: Readonly<any>, snapshot?: any) {
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
    status: any
    authorizedUserID: any
    isAuth: any
    isOwner?: boolean

}

type MapDispatchPropsType = {
    getUserProfile: (userID: any) => void
    getStatus: (userID: any) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profileInfo: string) => void

}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & { id?: string }

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserID: state.auth.id,
    isAuth: state.auth.isAuth,
})


// Старый способ вместо compose
// let AuthRedirectComponent = WithAuthRedirect(ProfileContainer)
// const WithParamsProfile = ProfileFC(AuthRedirectComponent)
// export default connect(mapStateToProps, {getUserProfile})(WithParamsProfile)


export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    ProfileFC,
    WithAuthRedirect
)(ProfileContainer)


// type PathParamsType = {
//     userID: string
// }

// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType