import styled from 'styled-components';
//Components
import TouchableIcon from '../Layout/Icons/TouchableIcon/TouchableIcon';
//Theme
import ThemeUtils from '../../utils/Theme/ThemeUtils';
//Constants
import { layoutConstants } from '../Layout/Layout';
//Icons
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export const ModalContainer = styled.div`${({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
`}`;

export const ModalCard = styled.div`${({ theme }) => `
    width: 40vw;
    max-width: 500px;
    background-color: ${ theme.backgroundColor };
    opacity: 0.97;
    display: flex;
    min-height: 35vh;
    flex-direction: column;
    padding: 0.75rem;
    border-radius: 0.75rem;

    @media (max-width: ${ layoutConstants.breakPoints.xl}) {
        width: 60vw;
    }
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        width: 80vw;
    }
    @media (max-width: ${ layoutConstants.breakPoints.md}) {
        width: 95vw;
    }
`}`;

export const ModalCloseButton = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faTimesCircle
    }))`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
    font-size: 1.5rem;
    margin-left: auto;
    margin-bottom: 0.25rem;
`}`;