import React, { useCallback } from 'react';
//Components
import LoadingText from '../../../../Shared/components/Loaders/LoadingText';
import ChatMessage from '../../../../ChatMessage/components/ChatMessage/ChatMessage';
//Styled components
import { ChatContentContainer } from './ChatContent.styles';
//Hooks
import useChatMessages from '../../../../Shared/store/hooks/chats/useChatMessages';
import { useAppSelector } from '../../../../Shared/store/hooks';

interface ChatContentProps {
    chatId: string;
}
const ChatContent: React.FC<ChatContentProps> = ({
    chatId
}) => (
    <ChatContentContainer>
        <ChatContentBody 
            chatId = { chatId }
        />
    </ChatContentContainer>
);

export default ChatContent;

//Internal components
const ChatContentBody: React.FC<ChatContentProps> = ({
    chatId
}) => {
    /**
     * Hooks
     */
    //State selector
    const { _id: userId } = useAppSelector(state => state.user);
    //Chat messages
    const { messages, fetching, getChatUserData } = useChatMessages(chatId);

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

    return (
        <>
            {
                isLoading()
                    ? <LoadingText 
                        text = 'Obteniendo mensajes...'
                    />
                    : messages.map(message => (
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