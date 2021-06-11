import React, { useState, useCallback } from 'react';
import { sendChatTextMessage } from '../../../../ChatMessage/infrastructure/api/chatMessagesApi';
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

    const sendMessage = useCallback(async () => {
        await sendChatTextMessage({
            chat: selectedChat,
            content: message
        });
        clearMessage();
    }, [
        message, 
        selectedChat,
        clearMessage,
    ]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key !== 'Enter')
            return;
        sendMessage();
    }, [sendMessage]);

    return (
        <ChatActionsContainer>
            <ChatActionsMessageInput 
                value = { message }
                onChange = { event => setMessage(event.target.value) }
                onKeyDown = { handleKeyDown }
            />
            <ChatActionsMessageSendButton 
                onClick = { sendMessage }
            />
        </ChatActionsContainer>
    );
}

export default ChatActions;
