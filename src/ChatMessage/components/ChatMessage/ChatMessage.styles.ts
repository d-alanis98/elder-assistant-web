import styled from 'styled-components';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';

interface ChatMessageProps {
    ownMessage: boolean;
}

export const ChatMessageContainer = styled.div<ChatMessageProps>`${({ 
    ownMessage 
}) => `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 50%;
    padding: 0.75rem;
    align-self: ${ ownMessage ? 'flex-end' : 'flex-start' };
    background-color: ${ getBackgroundColor(ownMessage) };
    border-radius: 0.5rem;
    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`}`;

export const ChatMessageEmisor = styled(Label)`
    font-size: 1.05rem;
    font-weight: 600;
    color: #555;
`;

export const ChatMessageIssuedAt = styled(Label)`
    font-size: 0.8rem;
    font-weight: 100;
    color: #666;
    align-self: flex-end;
    margin-top: 0.5rem;
`;


const getBackgroundColor = (ownMessage: boolean) => ownMessage
    ?'#e2ece9'
    : '#cddafd';