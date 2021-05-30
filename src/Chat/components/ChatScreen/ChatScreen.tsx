import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
//Domain
import { Nullable } from '../../../Shared/domain/Nullable';
import { ChatPrimitives } from '../../domain/Chat';
//Components
import ChatsList from '../ChatsList/ChatsList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import ChatConversation from '../ChatConversation/ChatConversation';
//Layout constants
import { HEADER_HEIGHT } from '../../../Shared/components/Header/Header.styles';
import { layoutConstants } from '../../../Shared/components/Layout/Layout';


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
            padding = '0'
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
    margin: 0;
    height: 100vh;
    display: flex;
    flex-direction: row;
    padding: 0;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        height: calc(100vh - ${ HEADER_HEIGHT }px);
    }
`

