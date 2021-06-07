import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getNotificationsAction, markAllNotificationsAsSeenAction } from '../../reducers/notificationsDuck';


const useNotifications = () => {
    //Store hooks
    const dispatch = useAppDispatch();
    const { 
        fetching, 
        nextNotifications, 
        receivedNotifications 
    } = useAppSelector(state => state.notifications);

    //Callbacks
    const getNotifications = useCallback(() => {
        dispatch(getNotificationsAction({ 
            startingAt: nextNotifications
        }));
    }, [
        dispatch,
        nextNotifications
    ]);

    const markAllNotificationsAsSeen = useCallback(() => {
        dispatch(markAllNotificationsAsSeenAction());
    }, [dispatch]);

    return {
        fetching,
        notifications: receivedNotifications,
        getNotifications,
        markAllNotificationsAsSeen
    }
}

export default useNotifications;