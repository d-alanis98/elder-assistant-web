import { useEffect, useCallback } from 'react'
//Domain
import { ValidUserTypes } from '../../../../User/domain/User';
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
//Hooks
import { 
    useAppDispatch, 
    useAppSelector 
} from '..';
//Actions
import { 
    getDevicesAction, 
    linkIoTDeviceAction, 
    getDevicesWithLoaderAction,
    getUserDevicesAction, 
} from '../../reducers/devicesDuck';

/**
 * Custom hook to get the user devices in the application.
 */
const useDevices = () => {
    /**
     * Hooks
     */
    //Redux store
    const { type: userType } = useAppSelector(state => state.user);
    const { 
        devices, 
        fetching,
        devicesByUser 
    } = useAppSelector(state => state.devices);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        //This is only for primary users
        if(userType !== ValidUserTypes.PRIMARY)
            return;
        dispatch(getDevicesWithLoaderAction());
    }, [
        userType,
        dispatch
    ]);

    //Callbacks
    const getDevices = useCallback(() => {
        dispatch(getDevicesAction())
    }, [dispatch]);

    const getUserDevices = useCallback(async (userId: string) => (
        await dispatch(getUserDevicesAction(userId))
    ), [dispatch]);

    const linkDevice = useCallback(async (deviceId: string) => (
        await dispatch(linkIoTDeviceAction(deviceId))
    ), [dispatch]);

    return { 
        devices: devices as IoTDevicePrimitives[], 
        fetching,
        getDevices,
        linkDevice,
        devicesByUser,
        getUserDevices
    };
}

export default useDevices;