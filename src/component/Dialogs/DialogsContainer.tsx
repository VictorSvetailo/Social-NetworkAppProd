import React from 'react';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {actions, DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import {compose} from 'redux';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
type MapDispatchPropsType = {
    sendMessage: (values: string) => void
}
export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

// с помощью {...actions} я пробросил все MDTP одним махом
export default compose(connect(mapStateToProps, {...actions}), WithAuthRedirect)(Dialogs) as React.ComponentType











// Варианты технологий

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
//     return {
//         sendMessage: (newDialogMessageBody: string) => {
//             dispatch(actions.sendMessage(newDialogMessageBody))
//         }
//     }
// }