import React from 'react';
//Domain
import { NotificationPrimitives } from '../../domain/Notifications';
//Components
import NotificationIcon from './NotificationIcon/NotificationIcon';
import NotificationContent from './NotificationContent/NotificationContent';
//Styled components
import { 
    FlexColumn
} from '../../../Shared/components/Layout/Containers/Flexbox.styles';
import { 
    NotificationListSubText,
    NotificationsListItemContainer 
} from './NotificationsList.styles';
//Hooks
import useLastUpdate from '../../../Shared/hooks/useLastUpdate';

export interface NotificationsProps {
    notification: NotificationPrimitives;
}

const NotificationsListItem: React.FC<NotificationsProps> = ({
    notification
}) => (
    <NotificationsListItemContainer>
        <NotificationIcon
            notification = { notification }
        />
        <NotificationDataContainer>
            <NotificationContent 
                notification = { notification }
            />
            <NotificationIssueDate 
                notification = { notification }
            />
        </NotificationDataContainer>
    </NotificationsListItemContainer>
);

export default NotificationsListItem;


/**
 * Internal components
 */
const NotificationDataContainer: React.FC = ({ children }) => (
    <FlexColumn
        flexGrow = { 1 }
        alignItems = 'flex-start'
        justifyContent = 'space-around'
    >
        { children }
    </FlexColumn>
)

const NotificationIssueDate: React.FC<NotificationsProps> = ({
    notification
}) => {
    /**
     * Hooks
     */
    //Last update label
    const lastUpdate = useLastUpdate(notification.issuedAt);

    //Render
    return (
        <NotificationListSubText>
            { lastUpdate }
        </NotificationListSubText>
    );
}
