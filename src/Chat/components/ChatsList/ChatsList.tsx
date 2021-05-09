import React from 'react';
//Components
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
import ChatListItem from './ChatListItem/ChatListItem';
//Styled components
import { ChatListContainer } from './ChatList.styles';
//Hooks
import useChats from '../../../Shared/store/hooks/chats/useChats';

const ChatsList: React.FC = () => {
    /**
     * Hooks
     */
    //Chats user belongs to hook
    const { chats, fetching } = useChats();

    if(fetching)
        return <LoadingText 
            text = 'Obteniendo chats...'
        />
    return (
        <ChatListContainer>
            {
                chats.map(chat => (
                    <ChatListItem 
                        key = { chat._id }
                        chat = { chat }
                    />
                ))
            }
        </ChatListContainer>
    );
}

export default ChatsList;