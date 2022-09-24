import React, {FC} from 'react';
import styles from './App.module.css';
import {News} from './component/News/News';
import {Header} from './component/Header/Header';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Route, Routes} from 'react-router-dom';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {Error} from './component/Error/Error';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';
import UsersContainer from './component/Users/UsersContainer';
import ProfileContainer from './component/Profile/ProfileContainer';
import HeaderContainer from './component/Header/HeaderContainer';



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
                    <Route path="/profile/*" element={<ProfileContainer/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/users" element={<UsersContainer/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/sittings" element={<Sittings/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>
        </div>
    );
}


export default App;
