import React, {useEffect, useState, MouseEvent} from 'react';


import {Button, Col, Row} from 'antd';
import TextArea from 'antd/es/input/TextArea';


// let wsChannel: WebSocket
// function createChannel(){
//     wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
// }


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}


const ChatPage: React.FC = () => {
    return <>
        <Row>
            <Col span={24}>
                <div style={{width: '100%'}}>
                    <Chat/>
                </div>
            </Col>
        </Row>

    </>
}


export const Chat: React.FC = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

        const closeHandler = () => {
            setTimeout(createChannel, 3000)
        }

        function createChannel() {

            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }
        createChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    useEffect(() => {

    }, [wsChannel])

    return <>
        <Row>
            <Col span={14}>
                <div style={{height: '600px', overflow: 'auto'}}>
                    <Messages wsChannel={wsChannel}/>
                    <AddMessageForm wsChannel={wsChannel}/>
                </div>
            </Col>
            <Col offset={2} span={2}>
                test
            </Col>
        </Row>
    </>
};

export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)

        return () => wsChannel?.removeEventListener('message', messageHandler)

    }, [wsChannel])

    const message = messages.map((m, index) => <Message key={index} message={m}/>)
    return <>
        <div>
            {message}
        </div>
    </>
};


export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return <>
        <img width={'40px'} height={'40px'} src={message.photo} alt="Message"/>
        <br/>
        <div>{message.userName}</div>
        <br/>
        <div>{message.message}</div>
        <hr/>
    </>
};


export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {

        let openHandler = () => {
            setReadyStatus('ready')
        };

        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage('')
    }

    return <>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{width: '300px'}} showCount
                  maxLength={100}/>
        <Button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Add Message</Button>
    </>
};


export default ChatPage
