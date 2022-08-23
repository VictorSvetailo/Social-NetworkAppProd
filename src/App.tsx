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
import {StoreType} from './component/redux/state';
import {Error} from './component/Error/Error';


type PropsType = {
    store: StoreType
}

const App: React.FC<PropsType> = (props) => {
    //const store = props.store
    //const state = props.store.getState()
    //let addPostCallback = props.store.addPost.bind(props.store)
    let messageAdd = props.store._state.profilePage.messageForNewPost
    let messageForCB = props.store._state.dialogsPage.messageForCB
    let posts = props.store._state.profilePage.posts
    let dialogsPage = props.store._state.dialogsPage.dialogs
    let sidebar = props.store._state.sidebar
    return (
        <div className="App">
            <Header/>
            <div className={styles.items}>
                <Sidebar sidebar={sidebar}/>
                <Routes>
                    <Route path="/"
                           element={<Profile
                               //addPostCallback={addPostCallback}
                               //changeNewTextCallback={props.store.changeNewText.bind(props.store)}
                               dispatch={props.store.dispatch.bind(props.store)}
                               messageAdd={messageAdd}
                               posts={posts}/>}/>
                    <Route path="/dialogs/*"
                           element={<Dialogs dialogsPage={dialogsPage}
                                             message={props.store._state.dialogsPage.messages}
                                             addNewTextCB={props.store.addNewTextCB}
                                             addPostCB={props.store.addPostCB}
                                             messageForCB={props.store._state.dialogsPage.messageForCB}/>}/>
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
