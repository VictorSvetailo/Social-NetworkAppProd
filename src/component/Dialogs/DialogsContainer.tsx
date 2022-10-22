import React from 'react';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {actions, DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import {compose, Dispatch} from 'redux';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    // newDialogMessageBody: string
    messages: Array<MessagesType>
}

type MapDispatchPropsType = {
    onClickAddPostCB: (values: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickAddPostCB: (newDialogMessageBody: string) => {
            dispatch(actions.postTextCBAC(newDialogMessageBody))
        }
    }
}

// let AuthRedirectComponent = WithAuthRedirect(Dialogs)

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
