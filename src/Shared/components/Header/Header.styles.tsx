import styled from 'styled-components';
import ThemeUtils from '../../utils/Theme/ThemeUtils';
//Constants
import { layoutConstants } from '../Layout/Layout';

//Size constants
export const HEADER_HEIGHT = 60;

//Styles
export const HeaderContainer = styled.nav`${({ theme }) => `
    position: fixed;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: ${ HEADER_HEIGHT }px;
    align-items: center;
    padding: 20px 0;
    background-color: ${ theme.secondaryColor };

    & > * {
        margin-bottom: 0.75rem;
    }

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        z-index: 999;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${ HEADER_HEIGHT }px;
        flex-direction: row;
        width: 100%;
        padding: 0 1rem;
        & > * {
            margin-bottom: 0;
            margin-right: 0.5rem;
            font-size: 0.9rem;
        }
    }

    @media (max-width: ${ layoutConstants.breakPoints.md }) {
        & > * {
            font-size: 0.85rem;
        }
    }
`}`;

export const HeaderTitle = styled.p`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
    font-size: 20px;
`}`;

const logoSize = HEADER_HEIGHT - 10;

export const HeaderLogo = styled.img`
    height: ${ logoSize}px;
    width: ${ logoSize }px;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        height: ${ logoSize / 1.25 }px;
        width: ${ logoSize / 1.25 }px;
    }
`;

export const HeaderToggler = styled.button`${({ theme }) => `
    display: none;
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    &:hover {
        background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme) };
    }

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        display: none;
    }
`}`;