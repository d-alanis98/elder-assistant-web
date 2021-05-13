import React from 'react';
//Domain
import { ChatMessageContent as ChatMessageContentParameters, ValidChatMessageTypes } from '../../../domain/ChatMessage';
//Components
import TextMessage from './MessageTypes/TextMessage';

interface ChatMessageContentProps {
    content: ChatMessageContentParameters;
}
const ChatMessageContent: React.FC<ChatMessageContentProps> = ({
    content
}) => {
    switch(content.type) {
        case ValidChatMessageTypes.TEXT:
            return <TextMessage 
                message = { content.content as string }
            />
        default:
            return null;
    }
}

export default ChatMessageContent;