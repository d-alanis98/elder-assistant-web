import styled from 'styled-components';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import TouchableIcon from '../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';


export const NotificationsListContainer = styled.ul`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: clamp(300px, 100%, 550px);
    list-style: none;
    margin: 0 auto;
`;

/**
 * NotificationsListItem
 */
export const NotificationsListItemContainer = styled.li`${({ theme }) => `
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 1.5rem 1rem;
    border: 1px solid ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
    margin-bottom: 0.5rem;
    border-radius: 1rem;
    align-items: center;

    &:hover {
        opacity: 0.75;
        transform: scale(1.005);
        box-shadow: 1px 1px 10px ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.25) };
        transition: all 300ms;
    }
`}`;

export const NotificationListItemIcon = styled(TouchableIcon)`${({ theme }) => `
    width: 3rem;
    height: 3rem;
    color: ${ theme.secondaryFontColor };
    padding: 0.15rem;
    margin: 0;
    border-radius: 50%;
    font-size: 1.5rem;
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.1) };
    margin-right: 0.75rem;
`}`;

export const NotificationListItemLabel = styled(Label)`
    font-size: 1.05rem;
`;

export const NotificationListSubText = styled(Label)`
    font-size: 0.8rem;
    opacity: 0.75;
`