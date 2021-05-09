import React from 'react';
//Domain
import { ChatPrimitives } from '../../../domain/Chat';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
//Styled components
import { 
    ChatListItemName, 
    ChatListItemContainer, 
    ChatListItemNewMessagesBadge,
    ChatListItemDescriptionContainer 
} from './ChatListItem.styles';


interface ChatListItemProps {
    chat: ChatPrimitives;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
    chat
}) => (
    <ChatListItemContainer>
        <Avatar 
            size = { 50 }
        />
        <ChatListItemDescriptionContainer>
            <ChatListItemName 
                name = { chat.name }
            />
        </ChatListItemDescriptionContainer>
        <ChatListItemNewMessagesBadge 
            newMessages = { 0 }
        />
    </ChatListItemContainer>
);

export default ChatListItem;