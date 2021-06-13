import { AnyAction } from 'redux';
import { ThunkAppAction } from '../store';
//Domain
import { AlertTypes } from '../../../Alerts/domain/Alerts';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Redux duck for the system alerts.
 */

/**
 * Constants
 */
//Action types
const SET_ALERT     = 'SET_ALERT';
const HIDE_ALERT    = 'HIDE_ALERT';
//Other constants
const DEFAULT_NOTIFICATION_TIME = 3500;
//State contract
interface AlertsState {
    type: AlertTypes,
    message: string;
    display: boolean;

}
//Initial state
const initialState: AlertsState = {
    type: AlertTypes.PRIMARY,
    message: '',
    display: false
};

/**
 * Reducer
 */

const reducer = (
    state = initialState,
    action: AnyAction
): AlertsState => {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return {
                ...state,
                type: payload.type,
                message: payload.message,
                display: true,
            };
        case HIDE_ALERT:
            return {
                ...state,
                message: '',
                display: false,
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
 * Action to create an alert which disappears after the given time, or the default time if no duration
 * parameter is provided.
 * @param {AlertTypes} type Alert type.
 * @param {string} message Alert message.
 * @param {number} duration Alert duration in ms.
 * @returns 
 */
export const createAlertAction = ({
    type,
    message,
    duration
}: CreateAlert): ThunkAppAction => (dispatch, getState) => {
    //We normalize some values
    const notificationDuration = duration || DEFAULT_NOTIFICATION_TIME; 
    //We show the notification
    dispatch({
        type: SET_ALERT,
        payload: {
            type,
            message
        }
    });
    //We set the timeout to hide the alert
    setTimeout(() => {
        dispatch({
            type: HIDE_ALERT
        });
    }, notificationDuration);
} 


/**
 * Helpers
 */
//Types
export interface CreateAlert {
    type: AlertTypes | keyof typeof AlertTypes;
    message: string;
    duration?: number;
}

