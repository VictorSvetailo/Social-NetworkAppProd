import React from 'react'
import styles from './Profile.module.css'
import {Profile} from './Profile';
import axios from 'axios';
import {setUserProfile} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';

// import {withRouter} from 'react-router-dom';







class ProfileContainer extends React.Component<ProfilePropsType, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data)
            })
    }

    render() {
        return (
            <div className={styles.blocks}>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}


type MapStatePropsType = {
    profile: null
}

type MapDispatchPropsType = {
    setUserProfile: (profile: any)=> void
}
export type ProfilePropsType = MapStatePropsType & MapDispatchPropsType



// let WithUrlDataContainerComponent = withRouter(ProfileContainer)

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    profile: state.profilePage.profile
})



export default connect(mapStateToProps, {setUserProfile})(ProfileContainer)




// type PathParamsType = {
//     userID: string
// }

// type PropsType = RouteComponentProps<PathParamsType> & ProfilePropsType