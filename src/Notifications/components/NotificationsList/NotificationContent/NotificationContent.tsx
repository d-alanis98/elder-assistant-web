import React, { useCallback } from 'react';
//Domain
import { ValidNotificationTypes } from '../../../domain/Notifications';
//Components
import SubscriptionNotification from './Subscription/SubscriptionNotification';
//Styled components
import { FlexColumn } from '../../../../Shared/components/Layout/Containers/Flexbox.styles';
//Props
import { NotificationsProps } from '../NotificationsListItem';

const NotificationContent: React.FC<NotificationsProps> = ({
    notification
}) => {
    /**
     * Hooks
     */
    //Callbacks
    const renderNotificationContentComponent = useCallback(() => {
        const component = notificationContentDictionary[notification.type] || null;
        //We create the element, passing the notification as prop
        return React.createElement(
            component,
            { content: notification.content }
        );
    }, [notification]);

    return (
        <FlexColumn
            alignItems = 'flex-start'
        >
            { renderNotificationContentComponent() }
        </FlexColumn>
    )
}

export default NotificationContent;

/**
 * Helpers
 */
const notificationContentDictionary = {
    [ValidNotificationTypes.SUBSCRIPTION as string]: SubscriptionNotification,
}