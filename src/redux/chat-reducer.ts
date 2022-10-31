import {chatAPI, ChatMessageAPIType, StatusType} from '../api/chat-api';
import {Dispatch} from 'redux';
import {v1} from 'uuid';
// import {InferActionsTypes} from './redux-store';


export type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}




export const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEiVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    //@ts-ignore
                    .map( m => ({...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            };
        case 'SN/CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) =>
        ({type: 'SN/CHAT/MESSAGES_RECEiVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) =>
        ({type: 'SN/CHAT/STATUS_CHANGED', payload: {status}} as const),
}


let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: any) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}


export const startMessagesListening = () => async (dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = () => async (dispatch: any) => {
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessages = (messages: string) => async (dispatch: any) => {
    chatAPI.sendMessages(messages)
}

// export type ActionsType = InferActionsTypes<typeof actions>


//@ts-ignore