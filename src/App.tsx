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
import {Login} from './component/Login/Login';
import {WithNewsRedirect} from './component/News/News';



type PropsType = {
    store: any
}


const App: React.FC<PropsType> = (props) => {
    let sidebar = props.store.getState().sidebar


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


export default App;
