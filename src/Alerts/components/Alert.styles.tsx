import styled from 'styled-components';
//Domain
import { AlertTypes } from '../domain/Alerts';

interface AlertContainerProps {
    type: AlertTypeValues;
    displayAlert: boolean;
}

export const AlertContainer = styled.div<AlertContainerProps>`
    position: -webkit-sticky;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    display: ${({ displayAlert }) => displayAlert 
        ? 'flex'
        : 'none'
    };
    padding: 0.2rem;
    align-items: center;
    justify-content: center;
`;

interface AlertContentProps {
    type: AlertTypeValues;
}
export const AlertContent = styled.div<AlertContentProps>`
    width: clamp(360px, 100%, 700px);
    padding: 0.75rem 1.25rem;
    border-radius: 0.5rem;
    opacity: 0.95;
    color: ${ ({ type }) => notificationColorsByType[type].fontColor };
    background-color: ${ ({ type }) => notificationColorsByType[type].backgroundColor };
    border: 2px solid ${ ({ type }) => notificationColorsByType[type].borderColor };
`;

/**
 * Helpers
 */

const notificationColorsByType = {
    [AlertTypes.DANGER]: {
        fontColor: '#842029',
        borderColor: '#f5c2c7',
        backgroundColor: '#f8d7da',
    },
    [AlertTypes.PRIMARY]: {
        fontColor: '#084298',
        borderColor: '#b6d4fe',
        backgroundColor: '#cfe2ff',
    },
    [AlertTypes.SUCCESS]: {
        fontColor: '#0f5132',
        borderColor: '#badbcc',
        backgroundColor: '#d1e7dd',
    },
    [AlertTypes.WARNING]: {
        fontColor: '#664d03',
        borderColor: '#ffecb5',
        backgroundColor: '#fff3cd',
    },
    [AlertTypes.INFORMATION]: {
        fontColor: '#055160',
        borderColor: '#b6effb',
        backgroundColor: '#cff4fc',
    }
};

//Types 
type AlertTypeValues = keyof typeof AlertTypes;
