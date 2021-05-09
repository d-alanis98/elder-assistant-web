export interface IoTDeviceDataPrimitives {
    _id: string,
    key: string,
    value: IoTDeviceDataType,
    deviceId: string,
    issuedAt: string,
}

export type IoTDeviceDataType = string | Object;