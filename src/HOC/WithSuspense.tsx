import React from 'react';


// let mapStateToPropsRedirect = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth
// })
// type MapStateToProps = {
//     isAuth: boolean
// }

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<div>loading...</div>}>
        <WrappedComponent {...props as any}/>
        </React.Suspense>
    }
}



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
