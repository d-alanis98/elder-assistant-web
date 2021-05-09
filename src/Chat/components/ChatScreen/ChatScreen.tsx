import React from 'react';
//Components
import ChatsList from '../ChatsList/ChatsList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';

const ChatScreen: React.FC = () => {

    return (
        <ScreenContainer
            section = 'Chat'
        >
            <ChatsList />
        </ScreenContainer>
    );
}

export default ChatScreen;
