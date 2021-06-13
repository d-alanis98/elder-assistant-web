import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
//Hooks
import useNotifications from '../store/hooks/notifications/useNotifications';
import useSubscriptions from '../store/hooks/subscriptions/useSubscriptions';

/**
 * @author Damian Alanis Ramirez
 * @version 1.2.1
 * @description Custom hook that acts as a services container. It is used to register all the services that 
 * must run once the app is mounted.
 */
const useRegisterServices = () => {
    /**
     * Hooks
     */
    //Store selector
    const { loggedIn } = useAppSelector(state => state.user);
    //Subscriptions
    const { getRequestedSubscriptions } = useSubscriptions();
    //Notifications
    const { getNotifications } = useNotifications();
    //Effects
    useEffect(() => {
        if(!loggedIn)
            return;
        getRequestedSubscriptions();
    }, [
        loggedIn,
        getRequestedSubscriptions
    ]);

    useEffect(() => {
        if(!loggedIn)
            return;
        getNotifications();
    }, [
        loggedIn,
        getNotifications
    ]);
};

export default useRegisterServices;