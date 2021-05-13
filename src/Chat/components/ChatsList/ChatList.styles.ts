import styled from 'styled-components';
//Constants
import { layoutConstants } from '../../../Shared/components/Layout/Layout';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';


export const ChatListContainer = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0,0,0,0.07);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border-right: none;
`;

export const ChatListTitleContainer = styled.div`${({ theme }) => `
    height: 1.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    opacity: 0.65;
    border-top-left-radius: 0.45rem;
`}`;

export const ChatListTitle = styled.h4`${({ theme }) => `
    font-weight: 500;
    font-size: 1.15rem;
    margin: 0 auto;
    padding: 0.15rem;
    color: ${ theme.fontColor };
`}`;

export const ChatListScrollContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-top: 15px;

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
`