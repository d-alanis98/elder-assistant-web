import { useEffect, useCallback } from 'react'
//Domain
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getDevicesAction, getDevicesWithLoaderAction } from '../../reducers/devicesDuck';

/**
 * Custom hook to get the user devices in the application.
 */
const useDevices = () => {
    /**
     * Hooks
     */
    //Redux store
    const { devices, fetching } = useAppSelector(state => state.devices);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        dispatch(getDevicesWithLoaderAction());
    }, [dispatch]);

    //Callbacks
    const getDevices = useCallback(() => {
        dispatch(getDevicesAction())
    }, [dispatch]);

    return { 
        devices: devices as IoTDevicePrimitives[], 
        fetching,
        getDevices,
    };
}

export default useDevices;