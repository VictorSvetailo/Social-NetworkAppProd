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
import {ActionsTypes, RootStateType, StoreType} from './component/redux/store';
import {Error} from './component/Error/Error';
import {DialogsContainer} from './component/Dialogs/DialogsContainer';


type PropsType = {
    store: any
}

const App: React.FC<PropsType> = (props) => {
    const store = props.store
    const state = props.store.getState()
    const dispatch = props.store.dispatch.bind(props.store)
    //let addPostCallback = props.store.addPost.bind(props.store)
    let messageAdd = state.profilePage.messageForNewPost
    let messageForCB = state.dialogsPage.messageForCB
    let posts = state.profilePage.posts
    let dialogsPage = state.dialogsPage.dialogs
    let sidebar = state.sidebar
    // @ts-ignore
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
                               //dispatch={props.store.dispatch.bind(props.store)}
                               // messageAdd={messageAdd}
                               //posts={posts}
                           />}/>
                    <Route path="/dialogs/*"
                           element={<DialogsContainer
                               //dialogsPage={dialogsPage}
                               //message={state.dialogsPage.messages}
                               // dispatch={dispatch}
                               // addNewTextCB={props.store.addNewTextCB}
                               //addPostCB={props.store.addPostCB}
                               //messageForCB={state.dialogsPage.messageForCB}
                           />}/>
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
