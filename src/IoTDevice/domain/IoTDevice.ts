/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Specification of the IoTDevice value objects and aggregate.
 */

export interface IoTDevicePrimitives {
    _id: string;
    name: string;
    type: string;
    ownedBy?: string;
    eventKeys: string[];
    configuration?: Object;
};