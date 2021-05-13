import React from 'react';
//Styled components
import { 
    ChatNotSelectedLabel,
    ChatNotSelectedContainer, 
    ChatNotSelectedIllustration
} from './ChatNotSelected.styles';

const ChatNotSelected: React.FC = () => {
    return (
        <ChatNotSelectedContainer>
            <ChatNotSelectedLabel>Seleccione un chat</ChatNotSelectedLabel>
            <ChatNotSelectedIllustration 
                src = '/assets/illustrations/clip-252.png'
                alt = 'Not selected chat illustration'
            />
        </ChatNotSelectedContainer>
    );
}

export default ChatNotSelected;