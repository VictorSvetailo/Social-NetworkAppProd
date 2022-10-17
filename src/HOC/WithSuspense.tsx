import React, {ComponentType, Suspense} from 'react';
import {Preloader} from '../component/common/Preloader/Preloader';


// let mapStateToPropsRedirect = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth
// })
// type MapStateToProps = {
//     isAuth: boolean
// }

export function withSuspense <T>(Component: any) {
    // const RedirectComponent = (props: MapStateToProps) => {
    //     const {isAuth, ...restProps} = props
    //     if (!props.isAuth) return <Navigate to={'/login'}/>
    //     return <Component  {...restProps as any} />
    // }
    // let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
    return (props: any) => {
            // return <Suspense fallback={<Preloader/>}> <Component {...props}/></Suspense>
    }
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
