import { AnyAction } from 'redux';
import { ThunkAppAction } from '../store';
//Domain
import { SubscriptionPrimitives } from '../../../Subscription/domain/Subscription';
//API
import { 
    requestSubscription,
    getRequestedSubscriptions
} from '../../../Subscription/infrastructure/subscriptionApi';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Specification of the subscriptions reducer, containing action types, the reducer itself and the action functions.
 */

/**
 * Constants
 */
const GET_SUBSCRIPTIONS         = 'GET_SUBSCRIPTIONS';
const GET_SUBSCRIPTIONS_ERROR   = 'GET_SUBSCRIPTIONS_ERROR';
const GET_SUBSCRIPTIONS_SUCCESS = 'GET_SUBSCRIPTIONS_SUCCESS';

//State contract
interface SubscriptionsState {
    error?: string;
    loading: boolean;
    subscriptions: SubscriptionsDictionary;
}
// Initial state
const initialState: SubscriptionsState = {	
    loading: false,
    subscriptions: { }
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): SubscriptionsState => {
    const { type, payload } = action;
    switch(type) {
        case GET_SUBSCRIPTIONS:
            return {
                ...state,
                loading: true,
            };
        case GET_SUBSCRIPTIONS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case GET_SUBSCRIPTIONS_SUCCESS:
            return {
                ...state,
                error: undefined,
                loading: false,
                subscriptions: payload,
            };
        default:
            return state;
    };
};

export default reducer;


/**
 * Actions
 */
/**
 * Action to get the requested subscriptions with PENDING state from the API.
 * @returns 
 */
export const getRequestedSubscriptionsAction = (): ThunkAppAction => async (dispatch, _) => {
    dispatch({
        type: GET_SUBSCRIPTIONS
    });
    try {
        const requestedSubscriptions = await getRequestedSubscriptions();
        dispatch({
            type: GET_SUBSCRIPTIONS_SUCCESS,
            payload: requestedSubscriptions.reduce((accumulated, current) => ({
                ...accumulated,
                [current.to]: current
            }), {})
        });
    } catch(error) {
        dispatch({
            type: GET_SUBSCRIPTIONS_ERROR,
            payload: error.message
        });
    }
};

/**
 * Action to create a subscription request to a primary user.
 * @param primaryUserId Id of the user to whom the subscription will be requested.
 * @returns 
 */
export const requestSubscriptionAction = (
    primaryUserId: string
): ThunkAppAction<Promise<SubscriptionPrimitives>> => async (dispatch, getState) => {
    //We get the existing subscriptions
    const { subscriptions: existingSubscriptions } = getState().subscriptions;
    try {
        const createdSubscriptionRequest = await requestSubscription(primaryUserId);
        //We update the state
        dispatch({
            type: GET_SUBSCRIPTIONS_SUCCESS,
            payload: {
                ...existingSubscriptions,
                [createdSubscriptionRequest.to]: createdSubscriptionRequest
            }
        });
        //We return the created subscription
        return createdSubscriptionRequest;
    } catch(error) {
        dispatch({
            type: GET_SUBSCRIPTIONS_ERROR,
            payload: error.message
        });
        return Promise.reject(error.message);
    }
}

/**
 * Helpers
 */
//Types
interface SubscriptionsDictionary {
    [primaryUserId: string]: SubscriptionPrimitives;
}