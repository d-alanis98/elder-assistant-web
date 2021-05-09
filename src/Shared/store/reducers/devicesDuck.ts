import { AnyAction } from 'redux';
//Thunk action type
import { ThunkAppAction } from '../store';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
//API
import { getDevicesData } from '../../../IoTDevice/infrastructure/api/devicesApi';

/**
 * @author Damián Alanís Ramírez
 * @version 2.2.1
 * @description Specification of the devices reducer, containing action types, the reducer itself and the action functions.
 */


/**
 * Constants
 */
//Actions
const GET_DEVICES           = 'GET_DEVICES';
const GET_DEVICES_ERROR     = 'GET_DEVICES_ERROR';
const GET_DEVICES_SUCCESS   = 'GET_DEVICES_SUCCESS';

//State shape
interface DevicesState {
    error?: string,
    devices: IoTDevicePrimitives[],
    fetching: boolean,
    lastEvents: { [key: string]: any },
    eventsHistory: { [key: string]: any },
}
// Initial state
const initialState: DevicesState = {	
    devices: [],
    fetching: false,
    lastEvents: { },
    eventsHistory: { }
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch(type) {
        case GET_DEVICES:
            return {
                ...state,
                error: undefined,
                fetching: true,
            };
        case GET_DEVICES_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_DEVICES_SUCCESS:
            return {
                ...state,
                error: undefined,
                devices: payload,
                fetching: false,
            }
        default:
            return state;
    };
};

export default reducer;


/**
 * Actions
 */
/**
 * Action to get the devices of a user from the API.
 * @returns 
 */
export let getDevicesAction = (): ThunkAppAction => async dispatch => {
    try {
        const devices = await getDevicesData();
        dispatch({
            type: GET_DEVICES_SUCCESS,
            payload: devices,
        });
    } catch(error) {
        dispatch({
            type: GET_DEVICES_ERROR,
            payload: error.message,
        });
    }
}

/**
 * Action to get the devices, setting the loader state.
 * @returns 
 */
export let getDevicesWithLoaderAction = (): ThunkAppAction => async (dispatch, getState) => {
    dispatch({
        type: GET_DEVICES
    });
    getDevicesAction()(dispatch, getState, null);
}

/**
 * Action to search a device in the devices array by it's ID.
 * @param {string} deviceId Id of the device to find.
 * @returns 
 */
export let findDeviceByIdAction = (deviceId: string): ThunkAppAction<IoTDevicePrimitives | undefined> => (dispatch, getState) => {
    const { devices: { devices } } = getState();
    if(!devices)
        return undefined;
    return devices.find((device: IoTDevicePrimitives) => (
        device._id === deviceId
    ));
}

/**
 * Action to get the event keys of a device.
 * @param deviceId Id of the device whose event keys we want to get.
 * @returns 
 */
export let getDeviceEventKeysAction = (deviceId: string): ThunkAppAction<string[]> => (dispatch, getState) => {
    const device: IoTDevicePrimitives | undefined = findDeviceByIdAction(deviceId)(dispatch, getState, null);
    if(!device)
        return [];
    return device.eventKeys;

}