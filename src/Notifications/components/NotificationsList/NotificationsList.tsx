import React, { useEffect } from 'react';
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
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
        <div>
            {
                Object.values(notifications).map(notification => (
                    <div
                        key = { notification._id }
                    >
                        { notification.type }
                    </div>
                ))
            }
        </div>
    )
};

export default NotificationsList;