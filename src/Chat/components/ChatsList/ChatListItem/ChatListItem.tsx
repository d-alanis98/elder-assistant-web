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
    onClick: () => void;
    selected?: boolean;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
    chat,
    onClick,
    selected
}) => (
    <ChatListItemContainer
        onClick = { onClick }
        selected = { selected }
    >
        <Avatar 
            size = { 50 }
            userName = { chat.members[0]?.name }
            userLastName = { chat.members[0]?.lastName }
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