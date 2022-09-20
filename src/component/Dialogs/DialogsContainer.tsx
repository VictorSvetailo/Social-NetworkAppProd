import React from 'react';
import styles from '../Dialogs/Dialogs.module.css';
import {DialogsItem} from './DialogsItem/DialogsItem';
import {Message} from './Message/Message';
import {ActionsTypes, DialogsType, MessagesType} from '../redux/store';
import {Dialogs} from './Dialogs';
import store from '../redux/redux-store';
import {addPostAC, changedNewTextAC} from '../redux/profile-reducer';
import {MyPosts} from '../Profile/MyPosts/MyPosts';
import {connect} from 'react-redux';

type DialogsPageAllType = {
    // store: any
    // dialogsPage: any
    // dialogsPage: Array<DialogsType>
    // message: Array<MessagesType>
    // messageForCB: string
    //dispatch: (action: ActionsTypes) => void
}


export function DialogsContainer(props: DialogsPageAllType) {
    const state = store.getState()

    let dialogs = state.dialogsPage.dialogs
    const dispatch = store.dispatch.bind(store)


    return (
        <div className={styles.dialogs}>
            <Dialogs dialogs={dialogs}
                     message={state.dialogsPage.messages}
                     messageForCB={state.dialogsPage.messageForCB}
                     dispatch={dispatch}
            />
        </div>
    )
}

// export default connect(DialogsContainer)


// <StoreContext.Consumer>
//     {
//         (store) => {
//             const state = store.getState()
//
//             let dialogs = state.dialogsPage.dialogs
//             const dispatch = store.dispatch.bind(store)
//
//             return  <Dialogs dialogs={dialogs}
//                              message={state.dialogsPage.messages}
//                              messageForCB={state.dialogsPage.messageForCB}
//                              dispatch={dispatch}
//             />
//         }
//     }
// </StoreContext.Consumer>