//Domain
import React from 'react';
//Domian
import { IoTDeviceTypes } from '../../../IoTDevice/domain/value-objects/IoTDeviceTypes';
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../domain/IoTDeviceData';
//Props to inject contract
import { BaseWidgetProps } from '../DeviceDataWidget/DeviceDataWidget';
//Components
import Location from './Wearable/Location/Location';
import CurrentDosis from './Pillbox/CurrentDosis/CurrentDosis';

type DataComponentsDictionary = {
    [IoTDeviceTypes in string]: { 
        [key: string]: React.FC<any>    
    }
}

export const deviceDataComponents: DataComponentsDictionary = {
    [IoTDeviceTypes.PILLBOX]: {
        CurrentDosis: CurrentDosis
    },
    [IoTDeviceTypes.WEARABLE]: {
        Location: Location
    }
}

interface WidgetComponentGetter {
    key: string,
    event: IoTDeviceDataPrimitives,
    device: IoTDevicePrimitives,
    eventKey: string,
    eventData: string | Object,
    deviceType: string | IoTDeviceTypes,
}

export const getWidgetComponent = ({
    key,
    event,
    device,
    eventKey,
    eventData,
    deviceType
}: WidgetComponentGetter) => {
    const component: React.FC | undefined = deviceDataComponents[deviceType]?.[eventKey];
    //We validate that the component is not undefined
    if(!component)
        return null;
    //We set the props
    const props: BaseWidgetProps = {
        key,
        event,
        device,
        eventData
    } 
    //We return the react element with the key and extra props
    return React.createElement(component, props);
}
