import styled from 'styled-components';
//Components
import TouchableIcon from '../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
//Theme
import ThemeUtils from '../../../../Shared/utils/Theme/ThemeUtils';
//Icons
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export const ChatActionsContainer = styled.div`${({ theme }) => `
    width: 100%;
    height: 3.25rem;
    color: ${ theme.fontColor };
    padding: 0.25rem;
    display: flex;
    flex-direction: row;
    opacity: 0.85;
    align-items: center;
    justify-content: space-around;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
    border-bottom-right-radius: 0.5rem;
`}`


export const ChatActionsMessageInput = styled.textarea`${({ theme }) => `
    width: 75%;
    height: 2.25rem;
    color: ${ theme.fontColor };
    background-color: ${ ThemeUtils.getThemedInverseTraslucidBackground(theme, 0.85, 0.15) };
    border-radius: 5px;
    padding: 0.25rem;
    font-size: 1.15rem;
    border: 1px solid rgba(0,0,0,0.2);
    &:focus {
        outline: none;
        border: 1px solid rgba(0,0,0,0.2);
    }

    resize: none;

    &::-webkit-scrollbar {
        width: 0.15rem;
    }

    &::-webkit-scrollbar-track {
        background-color: none;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #aaaaaa;

    }
`}`;

export const ChatActionsMessageSendButton = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faPaperPlane
    }))`
    font-size: 1rem;  
`;