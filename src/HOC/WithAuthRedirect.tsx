import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';

type MapStateToPropsType = {
    isAuth: boolean
}

const mapStateToPropsRedirect = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})


export function WithAuthRedirect <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    // создаем container component
    const RedirectComponent = (props: MapStateToPropsType) => {
        // Деструктуризация отделение props
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Navigate to={'/login'}/>
        // return здесь для Component которые в props
        // as any нужен для того чтобы
        return <WrappedComponent  {...restProps as any} />
    }
    let ConnectedAuthRedirectComponent = connect<MapStateToPropsType, {}, WCP, AppStateType>
    (mapStateToPropsRedirect)(RedirectComponent)
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
