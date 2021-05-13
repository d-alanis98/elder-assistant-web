import React, { useState, useCallback } from 'react';
//Domain
import { ChatPrimitives } from '../../../domain/Chat';
//Styled components
import { 
    ChatActionsContainer, 
    ChatActionsMessageInput, 
    ChatActionsMessageSendButton
} from './ChatActions.styles';

interface ChatActionsProps {
    selectedChat: ChatPrimitives;
}

const ChatActions: React.FC<ChatActionsProps> = ({
    selectedChat
}) => {
    /**
     * Hooks
     */
    //State
    const [message, setMessage] = useState<string>('');
    //Callbacks
    const clearMessage = useCallback(() => {
        setMessage('');
    }, [setMessage]);

    const sendMessage = useCallback(() => {
        console.log(`Sending message ${ message } to chat ${ selectedChat._id }`);
        clearMessage();
    }, [message, clearMessage]);


    return (
        <ChatActionsContainer>
            <ChatActionsMessageInput 
                value = { message }
                onChange = { event => setMessage(event.target.value) }
            />
            <ChatActionsMessageSendButton 
                onClick = { sendMessage }
            />
        </ChatActionsContainer>
    );
}

export default ChatActions;
