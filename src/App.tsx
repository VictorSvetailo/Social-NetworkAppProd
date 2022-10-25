import React, {Suspense} from 'react';
import styles from './App.module.css';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {Error} from './component/Error/Error';
import {UsersPage} from './component/Users/UsersPage';
import HeaderContainer from './component/Header/HeaderContainer';
import {LoginPage} from './component/Login/LoginPage';
import {WithNewsRedirect} from './component/News/News';
import {connect} from 'react-redux';
import {compose} from 'redux';
import store, {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/app-reducer';
import {Preloader} from './component/common/Preloader/Preloader';
import {withSuspense} from './HOC/WithSuspense';

const DialogsContainer = React.lazy(() => import('./component/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'));

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)


class App extends React.Component<AppPropsType> {
    // перехват ошибки
    //reason: any, promise: any
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert('Some error occurred')
    }

    componentDidMount() {
        this.props.initializeApp()
        // Ниже сделан side Effect. Мы оставили мусор за собой.
        // после того как компонента будет умирать этот мусор нужно убрать
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    // Это   который срабатывает при демонтировании компоненты
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    // если вдруг наше приложение не проинициализировалось, то мы показываем Preloader
    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        let sidebar = store.getState().sidebar
        return (
            <div className="App">
                <HeaderContainer/>
                <div className={styles.items}>
                    <Sidebar sidebar={sidebar}/>
                    <Routes>
                        <Route path="/profile" element={
                            <Suspense fallback={<Preloader/>}>
                                <SuspendedProfile/>
                            </Suspense>
                        }/>
                        <Route path="/profile/:id" element={
                            <Suspense fallback={<Preloader/>}>
                                <SuspendedProfile/>
                            </Suspense>
                        }/>

                        <Route path="/dialogs/*" element={
                            <Suspense fallback={<Preloader/>}>
                                <SuspendedDialogs/>
                            </Suspense>
                        }/>
                        {/*<Route path="/dialogs/*" element={<DialogsContainer/>}/>*/}
                        <Route path="/users" element={<UsersPage/>}/>
                        <Route path="/news" element={<WithNewsRedirect/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/sittings" element={<Sittings/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="*" element={<Error/>}/>
                        <Route path="/" element={<Navigate to="/profile"/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})


export type AppPropsType = MapStatePropsType & MapDispatchPropsType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

