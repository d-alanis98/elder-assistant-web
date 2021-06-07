import { useCallback, useState, useEffect } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
//Actions
import { getUnseenNotificationsAction } from '../../../store/reducers/notificationsDuck';

/**
 * Custom hook to get the number of unseen notifications.
 * @returns {Number|null}
 */
const useUnseenNotifications = () => {
    //Local state
    const [unseenNotifications, setUnseenNotifications] = useState<number | undefined>(undefined);
    //Store
    const dispatch = useAppDispatch();
    const { viewedNotifications } = useAppSelector(state => state.notifications);

    //Callbacks
    const getUnseenNotifications = useCallback(() => (
        dispatch(getUnseenNotificationsAction())
    ), [dispatch]);

    //Effects
    useEffect(() => {
        const unseenNotifications = getUnseenNotifications();
        setUnseenNotifications(
            unseenNotifications > 0
                ? unseenNotifications
                : undefined
        );
    }, [
        viewedNotifications,
        setUnseenNotifications,
        getUnseenNotifications
    ]);

    return unseenNotifications;
}

export default useUnseenNotifications;