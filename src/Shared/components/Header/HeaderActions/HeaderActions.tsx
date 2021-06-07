import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
//Components
import Avatar from '../../../../User/components/Layout/Avatar/Avatar';
import HeaderItem from './HeaderItem/HeaderItem';
import PrimaryUserProtected from '../../Screens/PrimaryUserProtected';
import SecondaryUserProtected from '../../Screens/SecondaryUserProtected';
//Styled components
import { HeaderActionsContainer } from './HeaderActions.styles';
//Hooks
import useCurrentScreen from '../../Navigation/hooks/useCurrentScreen';
import useUnseenNotifications from '../../Notifications/hooks/useUnseenNotifications';
//Icons
import { faBell, faCog, faComment, faHome, faMicrochip, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const HeaderActions: React.FC = () => {
    /**
     * Hooks
     */
    //History
    const history = useHistory();

    //Current screen
    const { currentScreen } = useCurrentScreen();

    //Callbacks
    const redirectToScreen = useCallback((screen: string) => {
        history.push(screen);
    }, [history]);


    
    const isActive = useCallback((screen: string): Boolean => (
        screen === currentScreen
    ), [currentScreen])

    return (
        <HeaderActionsContainer>
            <HeaderItem
                active = { isActive('') }
                section = ''
            >
                <Avatar 
                    size = { 40 }
                />
            </HeaderItem>
            <HeaderItem 
                icon = { faHome }
                active = { isActive('/') }
                section = 'Inicio'
                onClick = { () => redirectToScreen('/') }
            />
            <PrimaryUserProtected>
                <HeaderItem 
                    icon = { faMicrochip }
                    active = { isActive('/devices') }
                    section = 'Dispositivos'
                    onClick = { () => redirectToScreen('/devices') }
                />
            </PrimaryUserProtected>
            <SecondaryUserProtected>
                <HeaderItem 
                    icon = { faUserFriends }
                    active = { isActive('/users') }
                    section = 'Usuarios'
                    onClick = { () => redirectToScreen('/users') }
                />
            </SecondaryUserProtected>
            <HeaderItem 
                icon = { faComment }
                active = { isActive('/chat') }
                section = 'Chat'
                onClick = { () => redirectToScreen('/chat') }
            />
            <HeaderItem 
                icon = { faCog }
                active = { isActive('/settings') }
                section = 'Ajustes'
                onClick = { () => redirectToScreen('/settings') }
            />
            <NotificationsSection 
                active = { isActive('/notifications') }
                redirectToScreen = { redirectToScreen }
            />
        </HeaderActionsContainer>
    );
}

export default HeaderActions;


//Internal components
interface NotificationsSectionProps { 
    active: Boolean;
    redirectToScreen: (screen: string) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
    active,
    redirectToScreen
}) => {
    //Hooks
    //Unseen notifications
    const unseenNotifications = useUnseenNotifications();

    //Render
    return <HeaderItem 
        icon = { faBell }
        active = { active }
        section = 'Notificaciones'
        onClick = { () => redirectToScreen('/notifications') }
        badgeText = { unseenNotifications }
    />
}

