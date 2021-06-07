//Domain
import { NotificationPrimitives } from '../../../../Notifications/domain/Notifications';
//Hooks
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addNotificationAction } from '../../../store/reducers/notificationsDuck';
import useWebSocketMessage from '../../../utils/WebSockets/hooks/useWebSocketMessage';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Custom hook to register the notifications listeners, to 
 * update the notifications state with the notifications received via
 * WebSockets no matter in which screen we are.
 */
export const useNotificationServices = () => {
    //Store hooks
    const { loggedIn } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    //Web sockets messages hooks
    useWebSocketMessage((
        notification: NotificationPrimitives
    ) => {
        if(!loggedIn)
            return;
        dispatch(addNotificationAction(notification))
    }, 'Notification');

}