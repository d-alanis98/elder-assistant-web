import { useEffect, useCallback } from 'react'
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getLastDeviceDataAction, getLastDeviceDataWithLoaderAction } from '../../reducers/deviceDataDuck';


/**
 * @author Damián Alanís Ramírez
 * @version 1.3.2
 * @description Custom hooks to access the device data state and actions.
 */
const useDeviceData = (deviceId?: string) => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Redux state selector
    const { lastData, fetching } = useAppSelector(state => state.deviceData);

    //Effects
    useEffect(() => {
        deviceId &&
            dispatch(getLastDeviceDataWithLoaderAction(deviceId));
    }, [deviceId, dispatch]);

    //Callbacks
    const getLastDeviceData = useCallback((deviceId: string) => (
        dispatch(getLastDeviceDataAction(deviceId))
    ), [dispatch]);

    return {
        fetching,
        lastData,
        getLastDeviceData
    }
}

export default useDeviceData;