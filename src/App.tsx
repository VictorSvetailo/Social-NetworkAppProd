import React, {FC} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {Messages} from './component/Messages/Messages';
import {Header} from './component/Header/Header';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Profile} from './component/Profile/Profile';
import {stringify} from 'querystring';
import {v1} from 'uuid';
import state from './component/redux/state'
import {BrowserRouter, Route, Routes} from 'react-router-dom';

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
        // <BrowserRouter>
            <div className="App">
                {/*<Routes>*/}
                    {/*<Route path='/profile' element={<Profile/>}/>*/}
                    {/*<Route path='/messages' element={<Messages/>}/>*/}
                    <Header/>
                    <div className={styles.items}>
                        <Sidebar/>
                        <Profile/>
                    </div>
                {/*</Routes>*/}
            </div>
        // </BrowserRouter>

    );
}


export default App;
