import React from 'react';
import { Nullable } from '../../../Shared/domain/Nullable';
import { ChatPrimitives } from '../../domain/Chat';
//Components
import ChatActions from './ChatActions/ChatActions';
import ChatContent from './ChatContent/ChatContent';
import ChatNotSelected from './ChatNotSelected/ChatNotSelected';
//Styled components
import { 
    ChatGoBackButton,
    ChatConversationHeader, 
    ChatConversationContainer, 
    ChatConversationHeaderChatName, 
    ChatConversationScrollContainer, 
} from './ChatConversation.styles';

interface ChatConversationProps {
    selectedChat: Nullable<ChatPrimitives>;
    setSelectedChat: (chat?: Nullable<ChatPrimitives>) => void;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
    selectedChat,
    setSelectedChat
}) => {
    return (
        <ChatConversationContainer>
            <ChatConversationHeaderRenderer 
                selectedChat = { selectedChat }
                setSelectedChat = { setSelectedChat }
            />
            <ChatConversationScrollContainer>
                <ChatConversationMainAreaRenderer 
                    selectedChat = { selectedChat }
                />
            </ChatConversationScrollContainer>
            <ChatActionsRenderer 
                selectedChat = { selectedChat }
            />
        </ChatConversationContainer>
    );
}

export default ChatConversation;

//Internal components

interface ConversationProps {
    selectedChat: Nullable<ChatPrimitives>;
}

const ChatConversationHeaderRenderer: React.FC<ChatConversationProps> = ({
    selectedChat,
    setSelectedChat
}) => selectedChat
    ? (
        <ChatConversationHeader>
            <ChatGoBackButton 
                onClick={ () => setSelectedChat(undefined) }
            />
            <ChatConversationHeaderChatName>
                { selectedChat.name }
            </ChatConversationHeaderChatName> 
        </ChatConversationHeader>
    )
    : null;

const ChatConversationMainAreaRenderer:  React.FC<ConversationProps> = ({
    selectedChat
}) => selectedChat
    ? <ChatContent 
        chatId = { selectedChat._id }
    />
    : <ChatNotSelected />

const ChatActionsRenderer: React.FC<ConversationProps> = ({
    selectedChat
}) => selectedChat
    ? <ChatActions 
        selectedChat = { selectedChat }
    />
    : null;