import styled from 'styled-components';
//Domain
import { AlertTypes } from '../domain/Alerts';
//Theme
import { ThemeParameters } from '../../Shared/components/Theme/constants/ThemeParameters';

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
    padding: 0.25rem;
    align-items: center;
    justify-content: center;
    & > div {
        border: 3px solid ${ ({ 
            type,
            theme, 
        }) => getNotificationColor(type, theme) };
    }
`;

interface AlertContentProps {
    type: AlertTypeValues;
}
export const AlertContent = styled.div<AlertContentProps>`
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    opacity: 0.85;
    color: #fff;
    background-color: ${ ({ 
        type,
        theme, 
    }) => getNotificationColor(type, theme) };
`;

/**
 * Helpers
 */
//Functions
const getNotificationColor = (
    type: AlertTypeValues,
    theme: ThemeParameters
) => {
    const color = getNotificationColorByType(theme)[type];
    return color || theme.informationColor;
}

const getNotificationColorByType = (
    theme: ThemeParameters
): NotificationColorsDictionary => ({
    [AlertTypes.DANGER]: theme.alertColor,
    [AlertTypes.PRIMARY]: theme.primaryColor,
    [AlertTypes.SUCCESS]: theme.successColor,
    [AlertTypes.WARNING]: theme.warningColor,
    [AlertTypes.INFORMATION]: theme.informationColor
});

//Types 
type AlertTypeValues = keyof typeof AlertTypes;

interface NotificationColorsDictionary {
    [key: string]: string;
}