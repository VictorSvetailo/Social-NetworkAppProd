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
import {addPost, changeNewText, RootStateType} from './component/redux/state';


type PropsType = {
    state: RootStateType
}

function App(props: PropsType) {
    let addPostCallback = addPost
    let messageAdd = props.state.profilePage.messageForNewPost
    let posts = props.state.profilePage.posts
    let dialogsPage = props.state.dialogsPage.dialogs
    let sidebar = props.state.sidebar
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <div className={styles.items}>
                    <Sidebar sidebar={sidebar}/>
                    <Routes>
                        <Route path="/" element={<Profile addPostCallback={addPostCallback} changeNewTextCallback={changeNewText} messageAdd={messageAdd} posts={posts}/>}/>
                        <Route path="/profile" element={<Profile addPostCallback={addPostCallback} changeNewTextCallback={changeNewText} messageAdd={messageAdd} posts={posts}/>}/>
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
