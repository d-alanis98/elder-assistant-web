import React from 'react';
//Domain
import { Nullable } from '../../../Shared/domain/Nullable';
import { ChatPrimitives } from '../../domain/Chat';
//Components
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
import ChatListItem from './ChatListItem/ChatListItem';
//Styled components
import { 
    ChatListTitle,
    ChatListContainer, 
    ChatListTitleContainer,
    ChatListScrollContainer, 
} from './ChatList.styles';
//Hooks
import useChats from '../../../Shared/store/hooks/chats/useChats';


interface ChatListProps {
    selectedChat: Nullable<ChatPrimitives>;
    setSelectedChat: (chat?: Nullable<ChatPrimitives>) => void;
}

const ChatsList: React.FC<ChatListProps> = ({
    selectedChat,
    setSelectedChat
}) => (
    <ChatListContainer>
        <ChatListTitleContainer>
            <ChatListTitle>Chats</ChatListTitle>
        </ChatListTitleContainer>
        <ChatListScrollContainer>
            <ChatsRenderer 
                selectedChat = { selectedChat }
                setSelectedChat = { setSelectedChat }
            />
        </ChatListScrollContainer>
    </ChatListContainer>
);

export default ChatsList;

//Internal components

export const ChatsRenderer: React.FC<ChatListProps> = ({
    selectedChat,
    setSelectedChat
}) => {
    /**
     * Hooks
     */
    //Chats user belongs to hook
    const { chats, fetching } = useChats();

    //Render
    return (
    <> 
        {
            fetching && 
            chats.length === 0
            ? <LoadingText 
                text = 'Obteniendo chats...'
            />
            : chats.map(chat => (
                <ChatListItem 
                    key = { chat._id }
                    chat = { chat }
                    onClick = { () => setSelectedChat(chat) }
                    selected = { selectedChat?._id === chat._id }
                />
            ))
        }
    </>
    );
}