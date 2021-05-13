import styled from 'styled-components';
//Components
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
//Constants
import { layoutConstants } from '../../../Shared/components/Layout/Layout';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';
//Icons
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export const ChatConversationContainer = styled.div`${({ theme }) => `
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.07) };
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
`}`;

export const ChatConversationHeader = styled.div`${({ theme }) => `
    height: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    opacity: 0.65;
    border-top-right-radius: 0.45rem;
    color: ${ theme.fontColor };

`}`;

export const ChatConversationHeaderChatName = styled.h5`
    font-weight: 500;
    font-size: 1.05rem;
    margin: 0 auto;
`;

export const ChatGoBackButton = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faArrowCircleLeft
    }))`
    color: #aaaaaa;
    font-size: 16px;
`;

export const ChatConversationScrollContainer = styled.div`
    width: 100;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    overflow-y: auto;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        width: 100%;
    }

    &::-webkit-scrollbar {
        width: 0.2rem;
    }

    &::-webkit-scrollbar-track {
        background-color: none;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #aaaaaa;

    }
`;