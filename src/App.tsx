import React, {FC} from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import {News} from './component/News/News';
import {Header} from './component/Header/Header';
import {Sidebar} from './component/Sidebar/Sidebar';
import {Profile} from './component/Profile/Profile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Dialogs} from './component/Dialogs/Dialogs';
import {Sittings} from './component/Sittings/Sittings';
import {Music} from './component/Music/Music';
import {RootStateType} from './component/redux/state';
import {log} from 'util';
import {v1} from 'uuid';

type PropsType = {
    state: RootStateType
}

type Posts1Type = {
    id: string
    message: string
    likesCount: number
}


function App(props: PropsType) {

    // posts -------------------------
    let posts1 = props.state.profilePage.posts
    let [posts, setPosts] = React.useState<Array<Posts1Type>>([
        ...posts1
    ])
    const addTask = (message: string) => {
        setPosts([{id: v1(), message, likesCount: 50}, ...posts])
    }
    // --------------------------------

    let dialogsPage = props.state.dialogsPage.dialogs
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Sidebar/>
                <div className={styles.items}>
                    <Sidebar/>
                    <Routes>
                        <Route path="/profile" element={<Profile addTask={addTask} posts={posts}/>}/>
                        <Route path="/dialogs/*" element={<Dialogs dialogsPage={dialogsPage}
                                                                   message={props.state.dialogsPage.messages}/>}/>
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
