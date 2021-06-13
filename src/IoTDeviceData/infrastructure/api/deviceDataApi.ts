//IoTDevice domain
import { IoTDeviceDataPrimitives } from '../../domain/IoTDeviceData';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';
/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Facade to access device data API endpoints.
 */

export const getDevicesDataByEventType = async ({
    eventKey,
    deviceId,
    ownerUserId
}: GetDeviceDataByEventType): Promise<IoTDeviceDataPrimitives> => {
    try {
        const response = await AxiosRequest.get(
            `/iot/device/${deviceId}/latest?eventKey=${eventKey}&primaryUserId=${ ownerUserId }`
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


//Interfaces
interface GetDeviceDataByEventType {
    eventKey: string;
    deviceId: string;
    ownerUserId?: string;
}





