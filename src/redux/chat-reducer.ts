import {chatAPI, ChatMessageType} from '../api/chat-api';
// import {InferActionsTypes} from './redux-store';


let initialState = {
    messages: [] as ChatMessageType[]
}


export const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGES_RECEiVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state
    }
}

export const actions = {
    messagesReceived: (messages: string) =>
        ({type: 'SN/CHAT/MESSAGES_RECEiVED', payload: {messages}} as const)
}


let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: any) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            //@ts-ignore
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}

export const startMessagesListening = (messages: any) => async (dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = (messages: any) => async (dispatch: any) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessages = (messages: string) => async (dispatch: any) => {
    chatAPI.sendMessages(messages)
}

// export type ActionsType = InferActionsTypes<typeof actions>


//@ts-ignore