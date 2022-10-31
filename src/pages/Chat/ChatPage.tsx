import React, {useEffect, useState, useRef} from 'react';


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
        const status = useSelector((state: AppStateType) => state.chat.status)

        useEffect(() => {
            // @ts-ignore
            dispatch(startMessagesListening())
            return () => {
                // @ts-ignore
                dispatch(stopMessagesListening())
            }
        }, [])

        return <>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <Row>
                <Col span={14}>
                    <div>
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
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)


    const scrollHand = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 500)
        {
            !isAutoScroll && setIsAutoScroll(true)
         }else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])


    const message = messages.map((m) => <Message key={m.id} message={m}/>)
    return <>
        <div style={{height: '600px', overflow: 'auto'}} onScroll={scrollHand}>
            {message}
            <div ref={messageAnchorRef}></div>
        </div>

    </>
};


export const Message: React.FC<{ message: ChatMessageType }> =  React.memo(({message}) => {
    console.log('message')
    return <>
        <img width={'40px'} height={'40px'} src={message.photo} alt="Message"/>
        <br/>
        <div>{message.userName}</div>
        <br/>
        <div>{message.message}</div>
        <hr/>
    </>
})


export const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const dispatch = useAppDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

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
        <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Add Message</Button>
    </>
};


export default ChatPage
