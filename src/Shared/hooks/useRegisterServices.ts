import { useEffect } from 'react';
//Hooks
import useNotifications from '../store/hooks/notifications/useNotifications';
import useSubscriptions from '../store/hooks/subscriptions/useSubscriptions';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Custom hook that acts as a services container. It is used to register all the services that 
 * must run once the app is mounted.
 */
const useRegisterServices = () => {
    /**
     * Hooks
     */
    //Subscriptions
    const { getRequestedSubscriptions } = useSubscriptions();
    //Notifications
    const { getNotifications } = useNotifications();
    //Effects
    useEffect(() => {
        getRequestedSubscriptions();
    }, [getRequestedSubscriptions]);

    useEffect(() => {
        getNotifications();
    }, [getNotifications]);
};

export default useRegisterServices;