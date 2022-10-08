import React, {FC} from 'react';
import styles from './App.module.css';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Route, Routes, useParams} from 'react-router-dom';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {Error} from './component/Error/Error';
import DialogsContainer from './component/Dialogs/DialogsContainer';
import UsersContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';
import HeaderContainer from './component/Header/HeaderContainer';
import Login from './component/Login/Login';
import {WithNewsRedirect} from './component/News/News';
import {connect} from 'react-redux';
import {compose} from 'redux';
import store, {AppStateType} from './redux/redux-store';
import {initializeApp} from './redux/app-reducer';
import {initialize} from 'redux-form';
import {Preloader} from './component/common/Preloader/Preloader';


// type PropsType = {
//     store: any
// }

class App extends React.Component<AppPropsType, any> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized){
            return <Preloader/>
        }
        let sidebar = store.getState().sidebar
        return (
            <div className="App">
                <HeaderContainer/>
                <div className={styles.items}>
                    <Sidebar sidebar={sidebar}/>
                    <Routes>
                        <Route path="/profile" element={<ProfileContainer/>}/>
                        <Route path="/profile/:id" element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/news" element={<WithNewsRedirect/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/sittings" element={<Sittings/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Error/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

type MapStatePropsType = {
    initialized: any
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

const  mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    initialized: state.app.initialized
})


export type AppPropsType = MapStatePropsType & MapDispatchPropsType

export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

