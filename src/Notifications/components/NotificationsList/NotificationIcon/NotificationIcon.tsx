import React, { useCallback } from 'react';
//Domain
import { NotificationPrimitives, ValidNotificationTypes } from '../../../domain/Notifications';
//Styled components
import { NotificationListItemIcon } from '../NotificationsList.styles';
//Icons
import { faExclamationCircle, faMicrochip, faServer, faUserFriends } from '@fortawesome/free-solid-svg-icons';

interface NotificationIconProps {
    notification: NotificationPrimitives;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
    notification
}) => {
    /**
     * Hooks
     */
    //Callbacks
    const getNotificationIcon = useCallback(() => (
        notificationIconsDictionary[notification.type] || faServer
    ), [notification]);

    return React.useMemo(() => (
        <NotificationListItemIcon 
            icon = { getNotificationIcon() }
        />
    ), [
        getNotificationIcon
    ]);
}

export default NotificationIcon;


/**
 * Helpers
 */
const notificationIconsDictionary = {
    [ValidNotificationTypes.SYSTEM as string]: faServer,
    [ValidNotificationTypes.PANIC_ALERT as string]: faExclamationCircle,
    [ValidNotificationTypes.SUBSCRIPTION as string]: faUserFriends,
    [ValidNotificationTypes.IOT_DEVICE_EVENT as string]: faMicrochip
}