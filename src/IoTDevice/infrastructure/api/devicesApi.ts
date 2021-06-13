
//IoTDevice domain
import { IoTDevicePrimitives } from '../../domain/IoTDevice';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';
/**
 * @author Damián Alanís Ramírez
 * @version 1.3.1
 * @description Facade to access device API endpoints.
 */

export const getDevicesData = async (): Promise<IoTDevicePrimitives[]> => {
    try {
        const response = await AxiosRequest.get('/iot/devices');
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}


export const linkIoTDevice = async (iotDeviceId: string): Promise<IoTDevicePrimitives> => {
    const response = await AxiosRequest.post(
        `/iot/device/${ iotDeviceId }/link`,
        { }
    );
    return response.data;
}

export const getUserDevices = async (userId: string): Promise<IoTDevicePrimitives[]> => {
    const response = await AxiosRequest.get(
        `/user/${ userId }/iot/devices`
    );
    return response.data;
}




