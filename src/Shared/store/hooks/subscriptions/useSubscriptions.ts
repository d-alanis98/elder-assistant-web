import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { 
    requestSubscriptionAction,
    getRequestedSubscriptionsAction,
    acceptOrRejectSubscriptionAction, 
} from '../../reducers/subscriptionsDuck';
//Types
import { AcceptOrRejectSubscription } from '../../../../Subscription/infrastructure/subscriptionApi';

/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
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
        subscriptions,
        acceptedSubscriptions
    } = useAppSelector(state => state.subscriptions);
    //Callbacks
    const requestSubscription = useCallback(async (primaryUserId: string) => (
        dispatch(requestSubscriptionAction(primaryUserId))
    ), [dispatch]);

    const getRequestedSubscriptions = useCallback(async () => (
        dispatch(getRequestedSubscriptionsAction())
    ), [dispatch]);

    const acceptOrRejectSubscription = useCallback(({
        status,
        subscriptionId
    }: AcceptOrRejectSubscription) => {
        dispatch(acceptOrRejectSubscriptionAction({ status, subscriptionId }));
    }, [dispatch]);

    return {
        fetching,
        subscriptions,
        requestSubscription,
        acceptedSubscriptions,
        getRequestedSubscriptions,
        acceptOrRejectSubscription
    }
}

export default useSubscriptions;