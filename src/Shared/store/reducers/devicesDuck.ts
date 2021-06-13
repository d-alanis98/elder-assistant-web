import { AnyAction } from 'redux';
//Thunk action type
import { ThunkAppAction } from '../store';
//Domain
import { ValidUserTypes } from '../../../User/domain/User';
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
//API
import { getDevicesData, getUserDevices, linkIoTDevice } from '../../../IoTDevice/infrastructure/api/devicesApi';

/**
 * @author Damián Alanís Ramírez
 * @version 3.3.1
 * @description Specification of the devices reducer, containing action types, the reducer itself and the action functions.
 */


/**
 * Constants
 */
//Actions
const GET_DEVICES               = 'GET_DEVICES';
const GET_DEVICES_ERROR         = 'GET_DEVICES_ERROR';
const GET_DEVICES_SUCCESS       = 'GET_DEVICES_SUCCESS';
const GET_USER_DEVICES_ERROR    = 'GET_USER_DEVICES_ERROR';
const GET_USER_DEVICES_SUCCESS  = 'GET_USER_DEVICES_SUCCESS';
//State shape
interface DevicesState {
    error?: string;
    devices: IoTDevicePrimitives[];
    fetching: boolean;
    lastEvents: { [key: string]: any };
    eventsHistory: { [key: string]: any };
    devicesByUser: DevicesByUserDictionary;
}
// Initial state
const initialState: DevicesState = {	
    devices: [],
    fetching: false,
    lastEvents: { },
    eventsHistory: { },
    devicesByUser: { },
};

/**
 * Reducer
 */

const reducer = (
    state = initialState, 
    action: AnyAction
): DevicesState => {
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
        case GET_USER_DEVICES_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_USER_DEVICES_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false,
                devicesByUser: payload,
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
 * Action to get the devices of a certain user.
 * Subscription and permissions are validated on the server, to ensure thaht only allowed users get the data.
 * @param {string} userId Id of the user.
 * @returns 
 */
export const getUserDevicesAction = (
    userId: string
): ThunkAppAction<Promise<IoTDevicePrimitives[]>> => async (dispatch, getState) => {
    //We dispatch the loader action
    dispatch({
        type: GET_DEVICES
    });
    //First, we search in the existing dictionary
    const { devicesByUser } = getState().devices;
    const foundDevices = devicesByUser[userId];
    if(foundDevices)
        return foundDevices;
    //Otherwise, we requets the devices to the API
    try {
        const devices = await getUserDevices(userId);
        dispatch({
            type: GET_USER_DEVICES_SUCCESS,
            payload: {
                ...devicesByUser,
                [userId]: devices
            },
        });
        //We return the obtained devices
        return devices;
    } catch(error) {
        dispatch({
            type: GET_DEVICES_ERROR,
            payload: error.message,
        });
        return Promise.reject(error.message);
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
 * @param {string} deviceId Id of the device whose event keys we want to get.
 * @param {string} ownerId Id of the device owner.
 * @returns 
 */
export let getDeviceEventKeysAction = (
    deviceId: string,
    ownerId: string
): ThunkAppAction<string[]> => (dispatch, getState) => {
    //We get some properties from state
    const { 
        user: { type: userType },
        devices: { devicesByUser } 
    } = getState();
    //We get the device, if the user is of secondary it is a subscriptor and we need
    //to search for the device in the devicesByUser dictionary. Otherwise, the user is primary and
    //we can execute the findDeviceByIdAction
    let device: IoTDevicePrimitives | undefined = userType === ValidUserTypes.PRIMARY
        ? findDeviceByIdAction(deviceId)(dispatch, getState, null)
        : devicesByUser[ownerId]?.find(device => device._id === deviceId);
    if(!device)
        return [];
    return device.eventKeys;

}

/**
 * Action to request to link an IoT device to a primary user.
 * @param {string} deviceId IoT device ID.
 * @returns 
 */
export const linkIoTDeviceAction = (
    deviceId: string
): ThunkAppAction<Promise<IoTDevicePrimitives>> => async (dispatch, getState) => {
    //We get the existing devices from state
    const { devices: { devices } } = getState();
    //We link the device via the API
    try {
        const linkedDevice = await linkIoTDevice(deviceId);
        //We dispatch the updated devices
        dispatch({
            type: GET_DEVICES_SUCCESS,
            payload: devices.concat(linkedDevice)
        });
        //We return the device data
        return linkedDevice;
    } catch(error) {
        dispatch({
            type: GET_DEVICES_ERROR,
            payload: error.message
        });
        return Promise.reject(error);
    }
}


/**
 * Helpers
 */
//Types
interface DevicesByUserDictionary {
    [userId: string]: IoTDevicePrimitives[];
}