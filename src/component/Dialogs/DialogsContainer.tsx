import React, {ChangeEvent, MouseEvent} from 'react';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../redux/redux-store';
import {connect} from 'react-redux';
import {addNewTextCBAC, DialogsType, MessagesType, postTextCBAC} from '../redux/dialogs-reducer';
import {Dispatch} from 'redux';

type DialogsPageAllType = {
    // store: any
    // dialogsPage: any
    // dialogsPage: Array<DialogsType>
    // message: Array<MessagesType>
    // messageForCB: string
    //dispatch: (action: ActionsTypes) => void
}


// export function DialogsContainer(props: DialogsPageAllType) {
//     const state = store.getState()
//
//     let dialogs = state.dialogsPage.dialogs
//     const dispatch = store.dispatch.bind(store)
//
//     let onChangeAddTextCB = (value: string) => {
//         store.dispatch(addNewTextCBAC(value))
//         // props.addNewTextCB(e.currentTarget.value)
//     }
//     const onClickAddPostCB = (text: string) => {
//         store.dispatch(postTextCBAC(text))
//         // props.addPostCB(props.messageForCB)
//     }
//
//
//     return (
//         <div className={styles.dialogs}>
//             <Dialogs dialogs={dialogs}
//                      message={state.dialogsPage.messages}
//                      messageForCB={state.dialogsPage.messageForCB}
//                      dispatch={dispatch}
//                      onChangeAddTextCB={onChangeAddTextCB}
//                      onClickAddPostCB={onClickAddPostCB}
//             />
//         </div>
//     )
// }


// const state = store.getState()
//
// let dialogs = state.dialogsPage.dialogs\


type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messageForCB: string
    messages: Array<MessagesType>
}

type MapDispatchPropsType = {
    onChangeAddTextCB: (value: string) => void
    onClickAddPostCB: (text: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        messageForCB: state.dialogsPage.messageForCB,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onChangeAddTextCB: (value: string) => {
            dispatch(addNewTextCBAC(value))
        },
        onClickAddPostCB: (text: string) => {
            dispatch(postTextCBAC(text))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
