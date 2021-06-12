import React, { useEffect } from 'react';
//Components
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
import NotificationsListItem from './NotificationsListItem';
//Styled components
import { 
    NotificationsListContainer 
} from './NotificationsList.styles';
//Cuatom hooks
import useNotifications from '../../../Shared/store/hooks/notifications/useNotifications';

const NotificationsList: React.FC = () => {

    const { 
        fetching, 
        notifications, 
        getNotifications,
        markAllNotificationsAsSeen 
    } = useNotifications();

    //Effects
    useEffect(() => {
        getNotifications?.();
    }, [getNotifications]);

    useEffect(() => {
        markAllNotificationsAsSeen?.()
    }, [
        notifications,
        markAllNotificationsAsSeen
    ]);

    if(fetching)
        return <LoadingText 
            text = 'Obteniendo notificaciones'
        />

    return (
        <NotificationsListContainer>
            {
                Object.values(notifications).map(notification => (
                    <NotificationsListItem 
                        key = { notification._id }
                        notification = { notification }
                    />
                ))
            }
        </NotificationsListContainer>
    )
};

export default NotificationsList;