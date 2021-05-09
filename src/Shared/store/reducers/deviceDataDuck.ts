import { AnyAction } from 'redux';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../../IoTDeviceData/domain/IoTDeviceData';
//External actions
import { getDeviceEventKeysAction } from './devicesDuck';
//API
import { getDevicesDataByEventType } from '../../../IoTDeviceData/infrastructure/api/deviceDataApi';
//Base action type
import { ThunkAppAction } from '../store';


/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Specification of the device data reducer, containing action types, the reducer itself and the action functions.
 */

/**
 * Constants
 */
const GET_DEVICE_DATA                   = 'GET_DEVICE_DATA';
const GET_DEVICE_DATA_ERROR             = 'GET_DEVICE_DATA_ERROR';
const GET_DEVICE_DATA_SUCCESS           = 'GET_DEVICE_DATA_SUCCESS';
const GET_DEVICE_DATA_HISTORY_SUCCESS   = 'GET_DEVICE_DATA_HISTORY_SUCCESS';

//State shape
interface DeviceDataState {
    error?: string;
    fetching: boolean;
    lastData: LastDataDictionary;
    historyData: HistoryDataDictionary
}
// Initial state
const initialState: DeviceDataState = {	
    fetching: false,
    lastData: { },
    historyData: { },
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): DeviceDataState => {
    const { type, payload } = action;
    switch(type) {
        case GET_DEVICE_DATA:
            return {
                ...state,
                fetching: true,
            };
        case GET_DEVICE_DATA_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_DEVICE_DATA_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false,
                lastData: {
                    ...state.lastData,
                    ...payload
                },
            };
        case GET_DEVICE_DATA_HISTORY_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false,
                historyData: payload,
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
 * Action to get the last data of a device.
 * @param {string} deviceId Id of the device whose data we want to get.
 * @returns 
 */
export let getLastDeviceDataAction = (deviceId: string): ThunkAppAction<Promise<void>> => async (dispatch, getState) => new Promise((resolve, reject) => {
    //We get the device's event keys
    const eventKeys: string[] = getDeviceEventKeysAction(deviceId)(dispatch, getState, null);
    //We get the fetch data promises for each event key
    const promises: Promise<IoTDeviceDataPrimitives>[] = getDeviceDataByEventKeysPromises(eventKeys, deviceId);
    //We await for all the promises to resolve
    Promise.all(promises)
        .then(deviceEventsData => {
            //We get the last data dictionary
            const deviceLastData = getDeviceLastDataDictionary(deviceId, deviceEventsData);
            //We dispatch the GET_DEVICE_DATA_SUCCESS action with the device last data dictionary as payload
            dispatch({
                type: GET_DEVICE_DATA_SUCCESS,
                payload: deviceLastData
            });
            resolve();
        })
        .catch(error => {
            dispatch({
                type: GET_DEVICE_DATA_ERROR,
                payload: error,
            });
            reject();
        })
});

/**
 * Action to get the last data of a device with the loader state.
 * @param {string} deviceId Id of the device whose data we want to get.
 * @returns 
 */
export let getLastDeviceDataWithLoaderAction = (deviceId: string): ThunkAppAction => (dispatch, getState) => {
    //To set the fetching state to true
    dispatch({
        type: GET_DEVICE_DATA,
    });
    //We dispatch the action to get the last device data
    getLastDeviceDataAction(deviceId)(dispatch, getState, null);
}


/**
 * Helpers
 */
/**
 * Function to get the device data fetch promises for each key in an array ready to be used in Promise.all().
 * @param {string[]} eventKeys The key of the events whose last data we want to get.
 * @param {string} deviceId The ID of the device.
 * @returns 
 */
const getDeviceDataByEventKeysPromises = (eventKeys: string[], deviceId: string) => {
    const promises: Promise<IoTDeviceDataPrimitives>[] = [];
    //We get the request promise for each event key
    eventKeys.forEach((eventKey: string) => {
        const deviceEventsDataPromise = getDevicesDataByEventType(
            { eventKey, deviceId }
        );
        promises.push(deviceEventsDataPromise);        
    });
    return promises;
}

/**
 * Function to get the result last event dictionary for this device.
 * @param {string} deviceId The ID of the device.
 * @param {IoTDeviceDataPrimitives[]} deviceEventsData The obtained events data from the API.
 * @returns 
 */
const getDeviceLastDataDictionary = (
    deviceId: string,
    deviceEventsData: IoTDeviceDataPrimitives[]
) => {
    //We initialize the result dictionary
    const deviceLastData: LastDataDictionary = {};
    //We iterate through the results array
    deviceEventsData.forEach(deviceData => {
        //We validate the data existance
        if(!deviceData)
            return;
        //We create the empty object for the device id key if it does not exist
        if(!deviceLastData[deviceId])
            deviceLastData[deviceId] = {};
        //We append the data to the dictionary
        deviceLastData[deviceId][deviceData.key] = deviceData;
    });
    //We return the final dictionary
    return deviceLastData;
}

//Types
type LastDataDictionary = { 
    [deviceId: string]: LastEventData,
};
type HistoryDataDictionary = { 
    [deviceId: string]: {
        [eventKey: string]: IoTDevicePrimitives[] 
    }
};

export type LastEventData = {
    [eventKey: string]: IoTDeviceDataPrimitives
};