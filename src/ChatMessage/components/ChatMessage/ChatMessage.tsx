import React from 'react';
//Domain
import { ChatMessageContent as ChatMessageContentParameters } from '../../domain/ChatMessage';
//Components
import ChatMessageContent from './ChatMessageContent/ChatMessageContent';
//Styled components
import { ChatMessageContainer, ChatMessageEmisor, ChatMessageIssuedAt } from './ChatMessage.styles';

interface ChatMessageProps {
    issuedAt: string;
    senderName: string;
    ownMessage: boolean;
    messageContent: ChatMessageContentParameters;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    issuedAt,
    senderName,
    ownMessage,
    messageContent
}) => (
    <ChatMessageContainer
        ownMessage = { ownMessage }
    >
        <ChatMessageEmisor>{ senderName }</ChatMessageEmisor>
        <ChatMessageContent 
            content = { messageContent }
        />
        <ChatMessageIssuedAt>{ new Date(issuedAt).toLocaleString('es-mx') }</ChatMessageIssuedAt>
    </ChatMessageContainer>
);

export default ChatMessage;