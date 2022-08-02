import React, {FC} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {News} from './component/News/News';
import {Header} from './component/Header/Header';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Profile} from './component/Profile/Profile';
import {stringify} from 'querystring';
import {v1} from 'uuid';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dialogs} from './component/Dialogs/Dialogs';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';


// type messageType = {
//     message: string
// }
//
// type stateType = {
//     state: any
// }


function App() {

    // console.log(state)

    // let stateA = state.profilePage.posts[0].message
    // let stateA = state

    console.log()
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Sidebar/>
                <div className={styles.items}>
                    <Sidebar/>
                    <Routes>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/dialogs" element={<Dialogs/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/sittings" element={<Sittings/>}/>
                    </Routes>
                </div>

            </div>
        </BrowserRouter>

    );
}


export default App;
