import React, {ComponentType, PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStateToProps = {
    isAuth: boolean
}

export function WithAuthRedirect <T>(Component: ComponentType<T>) {
    const RedirectComponent = (props: MapStateToProps) => {
        const {isAuth, ...restProps} = props
        if (!props.isAuth) return <Navigate to={'/login'}/>
        return <Component  {...restProps as any} />
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
};


//!this.props.isAuth

//
//
// export const WithAuthRedirect = (Component: any) => {
//     class RedirectComponent extends React.Component {
//         render(){
//             if (this.props.isAuth) return <Navigate to={'/login'}/>
//             return <Component {...this.props}/>
//         }
//     }
//     return RedirectComponent
// };
