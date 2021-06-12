import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { 
    requestSubscriptionAction,
    getRequestedSubscriptionsAction, 
} from '../../reducers/subscriptionsDuck';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Custom hook for the Subscriptions entity.
 */
const useSubscriptions = () => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //State selector
    const { 
        loading: fetching,
        subscriptions
    } = useAppSelector(state => state.subscriptions);
    //Callbacks
    const requestSubscription = useCallback(async (primaryUserId: string) => (
        dispatch(requestSubscriptionAction(primaryUserId))
    ), [dispatch]);

    const getRequestedSubscriptions = useCallback(() => {
        dispatch(getRequestedSubscriptionsAction());
    }, [dispatch]);

    return {
        fetching,
        subscriptions,
        requestSubscription,
        getRequestedSubscriptions
    }
}

export default useSubscriptions;