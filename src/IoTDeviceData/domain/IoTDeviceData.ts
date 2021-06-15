export interface IoTDeviceDataPrimitives {
    _id: string;
    key: string;
    value: IoTDeviceDataType;
    deviceId: string;
    issuedAt: string;
    filePath?: string;
}

export type IoTDeviceDataType = string | Object;