import React, {ChangeEvent, MouseEvent} from 'react';
import {Dialogs} from './Dialogs';
import {AppStateType} from '../../redux/redux-store';
import {connect} from 'react-redux';
import {DialogsType, MessagesType, postTextCBAC} from '../../redux/dialogs-reducer';
import {compose, Dispatch} from 'redux';
import {Navigate} from 'react-router-dom';
import {WithAuthRedirect} from '../../HOC/WithAuthRedirect';

type MapStatePropsType = {
    dialogs: Array<DialogsType>
    newDialogMessageBody: any
    messages: Array<MessagesType>
}

type MapDispatchPropsType = {
    // onChangeAddTextCB: (value: string) => void
    onClickAddPostCB: (values: string) => void
}

export type DialogsPropsType = MapStatePropsType & MapDispatchPropsType


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newDialogMessageBody: state.dialogsPage.newDialogMessageBody,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        onClickAddPostCB: (newDialogMessageBody: string) => {
            dispatch(postTextCBAC(newDialogMessageBody))
        }
    }
}

// let AuthRedirectComponent = WithAuthRedirect(Dialogs)

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

// export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
