import React, {useEffect, useState, MouseEvent} from 'react';
import {Button, Col, Row} from 'antd';
import TextArea from 'antd/es/input/TextArea';


const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


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


    return <>
        {/*test*/}
        <Row>
            <Col span={14}>
                <div style={{height: '600px', overflow: 'auto'}}>
                    <Messages/>
                    <AddMessageForm/>
                </div>
            </Col>
            <Col offset={2} span={2}>
                test
            </Col>
        </Row>
    </>
};

export const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessage) => [...messages, ...newMessages])
        })
    }, [])

    const message = messages.map((m, index) => <Message key={index} message={m}/>)
    return <>
        <div>
            {message}
            {message}
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


export const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')

    const sendMessage = (e: MouseEvent<HTMLElement>) => {
        if (!message){
            return
        } else{
            wsChannel.send(message)
            setMessage('')
        }
    }

    return <>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{width: '300px'}} showCount maxLength={100}/>
        <Button onClick={sendMessage}>Add Message</Button>
    </>
};


export default ChatPage
