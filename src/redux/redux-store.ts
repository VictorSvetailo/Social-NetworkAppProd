import {applyMiddleware, combineReducers, createStore} from 'redux';
import {dialogsReducer} from './dialogs-reducer';
import {profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {usersReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {appReducer} from './app-reducer';

const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducers>

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

export default store

// @ts-ignore
window.store = store


// type RootState = typeof reducers;
//
// export type ReduxStateType = ReturnType<RootState>