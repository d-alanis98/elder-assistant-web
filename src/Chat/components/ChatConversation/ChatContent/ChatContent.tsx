import React, { useCallback, useEffect, useState } from 'react';
//Domain
import { ChatPrimitives } from '../../../domain/Chat';
//Components
import LoadingText from '../../../../Shared/components/Loaders/LoadingText';
import ChatMessage from '../../../../ChatMessage/components/ChatMessage/ChatMessage';
//Styled components
import { ChatContentContainer } from './ChatContent.styles';
//Hooks
import useChatMessages from '../../../../Shared/store/hooks/chats/useChatMessages';
import { useAppSelector } from '../../../../Shared/store/hooks';
import useWebSocketMessage from '../../../../Shared/utils/WebSockets/hooks/useWebSocketMessage';

//Constants
const CHAT_CONVERSATION_CONTAINER = 'chat-conversation-container';

interface ChatContentProps {
    chat: ChatPrimitives;
}
const ChatContent: React.FC<ChatContentProps> = ({
    chat
}) => (
    <ChatContentContainer
        id = { CHAT_CONVERSATION_CONTAINER }
    >
        <ChatContentBody 
            chat = { chat }
        />
    </ChatContentContainer>
);

export default ChatContent;

//Internal components
const ChatContentBody: React.FC<ChatContentProps> = ({
    chat
}) => {
    /**
     * Hooks
     */
    //State selector
    const { _id: userId } = useAppSelector(state => state.user);
    //Chat messages
    const { messages, fetching, getChatUserData } = useChatMessages(chat);
    //Web socket message hook
    useWebSocketMessage((message) => {
        setChatMessages(prevChatMessages => {
            let messagesCopy = [...prevChatMessages];
            messagesCopy.unshift(message);
            return messagesCopy;
        });
    }, 'ChatMessage');
    //Local state
    const [chatMessages, setChatMessages] = useState(messages);
    //Callbacks
    const isLoading = useCallback(() => (
        fetching && messages.length === 0
    ), [
        fetching,
        messages
    ]);

    const getSenderName = useCallback((userId: string) => {
        const chatUserData = getChatUserData(userId);
        if(!chatUserData)
            return 'Desconocido';
        return `${ chatUserData.name } ${ chatUserData.lastName }`;
    }, [ getChatUserData ]);

    const isOwnMessage = useCallback((senderId: string) => (
        senderId === userId
    ), [ userId ]);

    const scrollToBottom = useCallback(() => {
        const conversationContainer = document.querySelector(`#${ CHAT_CONVERSATION_CONTAINER }`);
        conversationContainer?.scrollBy({
            top: conversationContainer.scrollHeight,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        setChatMessages(messages);
    }, [messages])


    useEffect(() => {
        scrollToBottom();
    }, [
        chatMessages,
        scrollToBottom
    ]);

    return (
        <>
            {
                isLoading()
                    ? <LoadingText 
                        text = 'Obteniendo mensajes...'
                    />
                    : chatMessages.map(message => (
                        <ChatMessage 
                            key = { message._id }
                            issuedAt = { message.issuedAt }
                            senderName = { getSenderName(message.from) }
                            ownMessage = { isOwnMessage(message.from) }
                            messageContent = { message.content }
                        />
                    )).reverse()
            }
        </>
    );
}