import React, {FC} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {News} from './component/News/News';
import {Header} from './component/Header/Header';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Profile} from './component/Profile/Profile';
import {Route, Routes} from 'react-router-dom';
import {Dialogs} from './component/Dialogs/Dialogs';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {Error} from './component/Error/Error';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';
import {Users} from './component/Users/Users';


type PropsType = {
    store: any
}

const App: React.FC<PropsType> = (props) => {
    let sidebar = props.store.getState().sidebar

    return (
        <div className="App">
            <Header/>
            <div className={styles.items}>
                <Sidebar sidebar={sidebar}/>
                <Routes>
                    <Route path="/" element={<Profile/>}/>
                    <Route path="/dialogs/*" element={<DialogsContainer/>}/>
                    <Route path="/users" element={<Users/>}/>
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
