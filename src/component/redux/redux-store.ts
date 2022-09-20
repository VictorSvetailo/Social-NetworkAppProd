import {combineReducers, createStore} from 'redux';
import {dialogsReducer} from './dialogs-reducer';
import {profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';

const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
})

export type AppStateType = ReturnType<typeof rootReducers>

let store = createStore(rootReducers)

export default store


// type RootState = typeof reducers;
//
// export type ReduxStateType = ReturnType<RootState>