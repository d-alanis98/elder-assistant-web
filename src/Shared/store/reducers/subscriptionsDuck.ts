import { AnyAction } from 'redux';
import { ThunkAppAction } from '../store';
//Domain
import { ValidUserTypes } from '../../../User/domain/User';
import { SubscriptionPrimitives, SubscriptionValidStatus } from '../../../Subscription/domain/Subscription';
//API
import { 
    requestSubscription,
    getRequestedSubscriptions,
    getReceivedSubscriptions,
    acceptOrRejectSubscription,
    AcceptOrRejectSubscription
} from '../../../Subscription/infrastructure/subscriptionApi';
//External actions
import { getUserByIdAction } from './userDuck';
//Helpers
import UserHelper from '../../../User/helpers/UserHelper';

/**
 * @author Damián Alanís Ramírez
 * @version 2.4.1
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
    acceptedSubscriptions: SubscriptionPrimitives[];
}
// Initial state
const initialState: SubscriptionsState = {	
    loading: false,
    subscriptions: { },
    acceptedSubscriptions: []
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
                ...payload,
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
export const getRequestedSubscriptionsAction = (): ThunkAppAction<Promise<void>> => async (dispatch, getState) => {
    //We get the suer typ from the state
    const { type: userType } = getState().user;
    //We dispatch the loader action
    dispatch({
        type: GET_SUBSCRIPTIONS
    });
    try {
        //We get the requested subscriptions, with the corresponding method for each user type
        const requestedSubscriptions = await requestedSubscriptionsBasedOnUsertype(userType);
        dispatch({
            type: GET_SUBSCRIPTIONS_SUCCESS,
            payload: {
                subscriptions: getRequestedSubscriptionsDictionary(
                    userType,
                    requestedSubscriptions
                ),
                acceptedSubscriptions: getAcceptedSubscriptionsArray(requestedSubscriptions)
            }
        });
        //We set the users dictionary, because we maybe are going to need the user data of the subscription users
        requestedSubscriptions.forEach(subscription => {
            getUserByIdAction(subscription.to)(dispatch, getState, null);
            getUserByIdAction(subscription.from)(dispatch, getState, null);
        })
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
                subscriptions: {
                    ...existingSubscriptions,
                    [createdSubscriptionRequest.to]: createdSubscriptionRequest
                }
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
 * Action to update a subscription, accepting or rejecting it.
 * @param {string} status Status of the subscription, whether accepted or rejected.
 * @param {string} subscriptionId Id of the subscription to update.
 * @returns 
 */
export const acceptOrRejectSubscriptionAction = ({
    status,
    subscriptionId
}: AcceptOrRejectSubscription): ThunkAppAction => async (dispatch, getState) => {
    //We extract some data from the state
    const { 
        user: { type: userType },
        subscriptions: { subscriptions: existingSubscriptions, acceptedSubscriptions }
    } = getState();
    try {
        const updatedSubscription = await acceptOrRejectSubscription({ status, subscriptionId });
        //We dispatch the result
        dispatch({
            type: GET_SUBSCRIPTIONS_SUCCESS,
            payload: {
                subscriptions: getUpdatedSubscriptions(
                    userType,
                    updatedSubscription,
                    existingSubscriptions
                ),
                acceptedSubscriptions: concatAcceptedSubscription(
                    updatedSubscription,
                    acceptedSubscriptions
                )
            }
        })
    } catch(error) {
        dispatch({
            type: GET_SUBSCRIPTIONS_ERROR,
            payload: error.message
        });
    }
}

/**
 * Helpers
 */
//Functions
/**
 * Function to get the subscriptions making the request to the endpoint that corresponds depending on the
 * user type. Fpr the primary user we must get the received subscriptions, otherwise we must get the 
 * requested subscriptions, for the secodnary users.
 * @param {ValidUserTypes} userType User type.
 * @returns 
 */
const requestedSubscriptionsBasedOnUsertype = async (
    userType: ValidUserTypes
) => userType === ValidUserTypes.PRIMARY
    ? await getReceivedSubscriptions() //Endpoint for primary users
    : await getRequestedSubscriptions() //Endpoint for secondary users

/**
 * Function to get the subscriptions dictionary, it must be indexed by user ID, so we are going to perform
 * a different index depending of the user type. This is like that because we ideally want to store the 
 * subscriptions based on the users that we don't know.
 * For primary users we are going to index each subscription by the emisor's ID.
 * For seconday users we are going to index each subscription by the target's ID.
 * @param {ValidUserTypes} userType User type.
 * @param {SubscriptionPrimitives[]} requestedSubscriptions The obtained subscriptions array from the request.
 * @returns 
 */
const getRequestedSubscriptionsDictionary = (
    userType: ValidUserTypes,
    requestedSubscriptions: SubscriptionPrimitives[]
) => (
    requestedSubscriptions.reduce((accumulated, current) => ({
        ...accumulated,
        [ //We are going to index the subscriptions by user ID depending on the user type
            getDictionaryIndex(userType, current)
        ]: current
    }), {})
);

/**
 * Function to get the dictionary index based on the user type.
 * @param {ValidUserTypes} userType Type of the user.
 * @param {SubscriptionPrimitives} subscription Subscription data.
 * @returns 
 */
const getDictionaryIndex = (
    userType: ValidUserTypes,
    subscription: SubscriptionPrimitives
) => UserHelper.getValueBasedOnType<string>(
    userType,
    subscription.from, //If the user is a primary user, we are going to index by the emisor's ID
    subscription.to //If the user is secondary, we are going to index by the target's ID
)

/**
 * Function to get the accepted subscriptions array by performing a filter function to get only those entries
 * with a status equal to ACCEPTED.
 * @param {SubscriptionPrimitives[]} requestedSubscriptions The obtained subscriptions array from the request.
 * @returns 
 */
export const getAcceptedSubscriptionsArray = (
    requestedSubscriptions: SubscriptionPrimitives[]
) => (
    requestedSubscriptions.filter(subscription => (
        subscription.status === SubscriptionValidStatus.ACCEPTED
    ))
);

/**
 * Function to get the updated subscriptions dictionary.
 * @param {ValidUserTypes} userType Type of the user.
 * @param {SubscriptionPrimitives} updatedSubscription Updated subscription data.
 * @param {SubscriptionsDictionary} existingSubscriptions Existing subscriptions dictionary.
 * @returns 
 */
const getUpdatedSubscriptions = (
    userType: ValidUserTypes,
    updatedSubscription: SubscriptionPrimitives,
    existingSubscriptions: SubscriptionsDictionary
) => ({
    ...existingSubscriptions,
    [ 
        getDictionaryIndex(userType, updatedSubscription) 
    ]: updatedSubscription,
});

/**
 * Function to get the updated accepted subscriptions array, with the new items concatenated.
 * @param {SubscriptionPrimitives[]} subscriptionsToAdd Subscription or subscriptions array to add.
 * @param {SubscriptionPrimitives[]} acceptedSubscriptions Existing accepted subscriptions array.
 * @returns 
 */
const concatAcceptedSubscription = (
    subscriptionsToAdd: SubscriptionPrimitives | SubscriptionPrimitives[],
    acceptedSubscriptions: SubscriptionPrimitives[],
) => getAcceptedSubscriptionsArray(
    acceptedSubscriptions.concat(subscriptionsToAdd)
);

//Types
interface SubscriptionsDictionary {
    [primaryUserId: string]: SubscriptionPrimitives;
}