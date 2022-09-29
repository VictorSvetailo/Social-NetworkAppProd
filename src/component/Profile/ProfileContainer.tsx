import React from 'react'
import styles from './Profile.module.css'
import {Profile} from './Profile';
import axios from 'axios';
import {getUserProfile} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {ProfileFC} from './ProfileFC';

// import {withRouter} from 'react-router-dom';


class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        let userID = this.props.id
        this.props.getUserProfile(userID);
    }

    render() {
        console.log('id', this.props.id)
        return (
            <div className={styles.blocks}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}


type MapStatePropsType = {
    profile: null,

}

type MapDispatchPropsType = {
    // setUserProfile: (profile: any) => void
    getUserProfile: (userID: any) => void

}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType & { id?: string }

// let WithUrlDataContainerComponent = withRouter(ProfileContainer)


let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile,
})

const WithParamsProfile = ProfileFC(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithParamsProfile)


// type PathParamsType = {
//     userID: string
// }

// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType