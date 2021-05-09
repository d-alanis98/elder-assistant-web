
//IoTDevice domain
import { IoTDevicePrimitives } from '../../domain/IoTDevice';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';
/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Facade to access device API endpoints.
 */

export const getDevicesData = async (): Promise<IoTDevicePrimitives[]> => {
    try {
        const response = await AxiosRequest.get('/iot/devices');
        return response.data;
    } catch(error) {
        console.log({ error })
        return Promise.reject(error);
    }
}





