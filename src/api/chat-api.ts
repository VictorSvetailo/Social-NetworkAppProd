//
//


import {sendMessages} from '../redux/chat-reducer';

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null
// ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages))
};

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}


export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessages(message: string) {
        ws?.send(message)
    }
}


type SubscriberType = (messages: ChatMessageType[]) => void


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
