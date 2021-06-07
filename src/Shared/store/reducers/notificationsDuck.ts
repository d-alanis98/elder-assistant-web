import { AnyAction } from 'redux';
import { ThunkAppAction } from '../store';
//Domain
import { QueryParameters } from '../../domain/QueryParamters';
import { NotificationPrimitives } from '../../../Notifications/domain/Notifications';
//API
import { getNotifications } from '../../../Notifications/infrastructure/api/notificationsApi';

/**
 * Constants
 */
//Action types
const GET_NOTIFICATIONS         = 'GET_NOTIFICATIONS';
const GET_NOTIFICATIONS_ERROR   = 'GET_NOTIFICATIONS_ERROR';
const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
//Util constants
const VIEWED_NOTIFICATIONS      = 'VIEWED_NOTIFICATIONS';
//State contract
interface NotificationsState {
    error?: string;
    fetching: Boolean;
    nextNotifications: string | null;
    viewedNotifications: NotificationViewsDictionary;
    receivedNotifications: NotificationsDictionary;
}
//Initial state
const initialState: NotificationsState = { 
    fetching: false,
    nextNotifications: null,
    viewedNotifications: {},
    receivedNotifications: {}
};
/**
 * Reducer
 */
const reducer = (
    state = initialState, 
    action: AnyAction
): NotificationsState => {
    const { type, payload } = action;
    switch(type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                fetching: true
            };
        case GET_NOTIFICATIONS_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                ...payload,
                fetching: false,
            };
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */
/**
 * Method to get the notifications by requesting them to the API, updating the local state with the result.
 * @param {number} limit Number of records to fetch.
 * @param {string} startingAt Starting point of the paginated result.
 * @returns 
 */
export const getNotificationsAction = ({
    limit,
    startingAt
}: QueryParameters): ThunkAppAction => async (dispatch, getState) => {
    try {
        //We dispatch the loading state
        dispatch({
            type: GET_NOTIFICATIONS
        });
        //We get the data from the API
        const notifications = await getNotifications({ limit, startingAt });
        //We get the data
        const viewedNotificationsDictionary = getViewedNotificationsDictionary(
            getState().notifications,
            notifications.data
        );
        //We update it at state level
        dispatch({
            type: GET_NOTIFICATIONS_SUCCESS,
            payload: {
                nextNotifications: notifications.next,
                viewedNotifications: viewedNotificationsDictionary,
                receivedNotifications: getNotificationsDictionary(
                    notifications.data
                )
            }
        });
        //We persist the viewed notifications dictionary
        persistUnseenNotifications(viewedNotificationsDictionary);
    } catch(error) {
        dispatch({
            type: GET_NOTIFICATIONS_ERROR,
            payload: error.message
        });
    }
} 

/**
 * Method to add a received notification (via WebSockets) to the state.
 * @param {NotificationPrimitives} notification Notification to add.
 * @returns 
 */
export const addNotificationAction = (
    notification: NotificationPrimitives
): ThunkAppAction => (dispatch, getState) => {
    const { viewedNotifications, receivedNotifications } = { ...getState().notifications };
    //We get the viewed notifications dictionary
    const updatedViewedNotifications = {
        ...viewedNotifications,
        [notification._id]: false
    };
    //We update the data at state level
    dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: {
            viewedNotifications: {
                ...viewedNotifications,
                [notification._id]: false
            },
            receivedNotifications: {
                ...receivedNotifications,
                [notification._id]: notification
            }
        }
    });
    //We persist the viewed notifications dictionary
    persistUnseenNotifications(updatedViewedNotifications);
}

/**
 * Method to get the unseen notifications number.
 * @returns {Number}
 */
export const getUnseenNotificationsAction = (): ThunkAppAction<number> => (_, getState) => {
    const { viewedNotifications } = { ...getState().notifications };
    return Object.values(viewedNotifications).reduce((accumulated, current) => (
        accumulated + (current ? 0 : 1)
    ), 0);
}

/**
 * Action to restore the viewed notifications dictionary from local storage.
 * @returns 
 */
export const restoreViewedNotificationsAction = (): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: {
            viewedNotifications: retrieveUnseenNotifications()
        }
    });
}

export const markAllNotificationsAsSeenAction = (): ThunkAppAction => (dispatch, getState) => {
    //We get the viewed dicitonary from state
    const { viewedNotifications } = { ...getState().notifications };
    const updatedViewedNotifications = getViewedDictionaryWithAllSeen(viewedNotifications);
    //We dispatch the updated viewed notifications dictionary
    dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: {
            viewedNotifications: updatedViewedNotifications
        }
    });
    //We persist the notifications to the local state
    persistUnseenNotifications(updatedViewedNotifications);
}


/**
 * Helpers
 */
//Functions
/**
 * Method to get the notifications in dictionary form.
 * @param {NotificationPrimitives[]} notifications Notifications list.
 * @returns 
 */
const getNotificationsDictionary = (notifications: NotificationPrimitives[]) => (
    notifications.reduce((accumulated, current) => ({
        ...accumulated,
        [current._id]: current
    }), {})
);

/**
 * Method to get the viewed notifications in dictionary form.
 * @param {NotificationsState} state Notifications state.
 * @param {NotificationPrimitives[]} notifications Notifications list.
 * @returns 
 */
const getViewedNotificationsDictionary = (
    state: NotificationsState,
    notifications: NotificationPrimitives[], 
) => {
    //We get the viewed notifications in state
    const { viewedNotifications } = state;
    //We return the merged dictionary
    return getMergedViewedNotificationsDictionary(
        notifications,
        viewedNotifications
    );
}

/**
 * Method to get the merged viewed notifications dictionary, it combines the received notifications with
 * the existing viewed notifications dictionary, if an entry already exists in the viewedNotificationsInState
 * we preserve it, otherwise, we initialize it as unseen (false value).
 *
 * @param {NotificationPrimitives[]} notifications Notifications list.
 * @param {NotificationViewsDictionary} viewedNotificationsInState The existing viewed notifications dictionary.
 * @returns 
 */
const getMergedViewedNotificationsDictionary = (
    notifications: NotificationPrimitives[],
    viewedNotificationsInState: NotificationViewsDictionary
): NotificationViewsDictionary => (
    notifications.reduce((accumulated, current) => ({
        ...accumulated,
        [current._id]: viewedNotificationsInState[current._id] || false,
    }), {})
);

/**
 * Method to save the viewed notifications in state to the local storage.
 * @param {NotificationViewsDictionary} viewedNotificationsInState Viewed notifications dictionary.
 */
const persistUnseenNotifications = (
    viewedNotificationsInState: NotificationViewsDictionary
) => {
    localStorage.setItem(
        VIEWED_NOTIFICATIONS, 
        JSON.stringify(viewedNotificationsInState)
    );
}

/**
 * Method to get the viewed notifications dictionary from local storage.
 * @return {NotificationViewsDictionary} 
 */
const retrieveUnseenNotifications = (): NotificationViewsDictionary => {
    const storedNotifications = localStorage.getItem(VIEWED_NOTIFICATIONS);
    if(!storedNotifications)
        return { };
    return JSON.parse(storedNotifications);
}

const getViewedDictionaryWithAllSeen = (
    viewedNotifications: NotificationViewsDictionary
) => (
    Object.keys(viewedNotifications).reduce((accumulated, current) => ({
        ...accumulated,
        [current]: true
    }), {})
);

//Types
interface NotificationsDictionary {
    [notificationId: string]: NotificationPrimitives;
}

interface NotificationViewsDictionary {
    [notificationId: string]: Boolean;
}