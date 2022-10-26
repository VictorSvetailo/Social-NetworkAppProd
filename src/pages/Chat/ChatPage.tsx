import React, {useEffect, useState, MouseEvent} from 'react';


import {Button, Col, Row} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {AppStateType, useAppDispatch} from '../../redux/redux-store';
import {sendMessages, startMessagesListening, stopMessagesListening} from '../../redux/chat-reducer';
import {useSelector} from 'react-redux';


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

        const dispatch = useAppDispatch()

        useEffect(() => {
            // @ts-ignore
            dispatch(startMessagesListening())
            return () => {
                // @ts-ignore
                dispatch(stopMessagesListening())
            }
        }, [])

        return <>
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
    }
;

export const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)


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


export const AddMessageForm: React.FC = () => {

    const dispatch = useAppDispatch()



    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    //
    // useEffect(() => {
    //
    // }, [wsChannel])


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessages(message))
        setMessage('')
    }

    return <>
        <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{width: '300px'}} showCount
                  maxLength={100}/>
        <Button disabled={false} onClick={sendMessageHandler}>Add Message</Button>
    </>
};


export default ChatPage
