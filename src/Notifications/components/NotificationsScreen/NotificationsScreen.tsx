import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import NotificationsList from '../NotificationsList/NotificationsList';



const NotificationsScreen: React.FC = () => {
    return (
        <ScreenContainer
            section = 'Notificaciones'
        >
            <NotificationsList />
        </ScreenContainer>
    );
}

export default NotificationsScreen;