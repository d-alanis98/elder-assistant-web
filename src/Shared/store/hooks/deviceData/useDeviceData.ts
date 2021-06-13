import { useEffect, useCallback } from 'react';
//Domain
import { IoTDeviceDataPrimitives } from '../../../../IoTDeviceData/domain/IoTDeviceData';
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { 
    getLastDeviceDataAction, 
    updateLastDeviceDataAction,
    getLastDeviceDataWithLoaderAction 
} from '../../reducers/deviceDataDuck';


/**
 * @author Damián Alanís Ramírez
 * @version 2.4.2
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
    const getLastDeviceData = useCallback((
        deviceId: string, 
        ownerUserId?: string
    ) => (
        dispatch(getLastDeviceDataAction(deviceId, ownerUserId))
    ), [dispatch]);

    const updateLastDeviceData = useCallback((deviceData: IoTDeviceDataPrimitives) => {
        dispatch(updateLastDeviceDataAction(deviceData));
    }, [dispatch]);

    return {
        fetching,
        lastData,
        getLastDeviceData,
        updateLastDeviceData
    }
}

export default useDeviceData;