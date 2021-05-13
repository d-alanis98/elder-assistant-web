import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
//Domain
import { Nullable } from '../../../Shared/domain/Nullable';
import { ChatPrimitives } from '../../domain/Chat';
//Components
import ChatsList from '../ChatsList/ChatsList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import ChatConversation from '../ChatConversation/ChatConversation';


const ChatScreen: React.FC = () => {
    /**
     * Hooks
     */
    //State
    const [selectedChat, setSelectedChat] = useState<Nullable<ChatPrimitives>>();

    //Callbacks
    const handleSelectedChat = useCallback((selectedChat?: Nullable<ChatPrimitives>) => {
        setSelectedChat(selectedChat);
    }, [setSelectedChat]);

    return (
        <ScreenContainer
            padding = '2px'
        >

            <ChatContainer>
                <ChatsList 
                    selectedChat = { selectedChat }
                    setSelectedChat = { setSelectedChat }
                />
                <ChatConversation 
                    selectedChat = { selectedChat }
                    setSelectedChat = { handleSelectedChat }
                />
            </ChatContainer>
        </ScreenContainer>
    );
}

export default ChatScreen;

//Internal components
const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 0;
    padding-top: 0.5rem;
`

