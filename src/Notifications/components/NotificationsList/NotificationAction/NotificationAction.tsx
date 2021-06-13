import React, { useCallback } from 'react';
//Domain
import { ValidNotificationTypes } from '../../../domain/Notifications';
//Components
import AcceptOrRejectSubscription from './Subscription/AcceptOrRejectSubscription';
//Styled components
import { NotificationActionContainer } from './NotificationAction.styles';
//Props
import { NotificationsProps } from '../NotificationsListItem';


const NotificationAction: React.FC<NotificationsProps> = ({
    notification
}) => {
    /**
     * Hooks
     */
    //Callbacks
    const renderNotificationActionComponent = useCallback(() => {
        const component = notificationActionsDictionary[notification.type] || null;
        //We create the element, passing the notification as prop
        return React.createElement(
            component,
            { content: notification.content }
        );
    }, [notification]);

    return (
        <NotificationActionContainer>
            { renderNotificationActionComponent() }
        </NotificationActionContainer>
    );
};

export default NotificationAction;

/**
 * Helpers
 */
const notificationActionsDictionary = {
    [ValidNotificationTypes.SUBSCRIPTION as string]: AcceptOrRejectSubscription,
}