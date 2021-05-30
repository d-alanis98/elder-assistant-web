import React, { useEffect, useState } from 'react';
//Domain
import { IoTDevicePrimitives } from '../../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../../domain/IoTDeviceData';
//Hooks
import useDeviceData from '../../../../Shared/store/hooks/deviceData/useDeviceData';
import useWebSocketMessage from '../../../../Shared/utils/WebSockets/hooks/useWebSocketMessage';
//Types
import { LastEventData } from '../../../../Shared/store/reducers/deviceDataDuck';
//Helper functions
import { getWidgetComponent } from '../../DeviceDataComponents/componentsDictionary';


interface WidgetDataRendererProps {
    device: IoTDevicePrimitives;
}

const WidgetDataRenderer: React.FC<WidgetDataRendererProps> = ({
    device
}) => {
    /**
     * Hooks
     */
    //Device data
    const { lastData, updateLastDeviceData } = useDeviceData();
    //State
    const [deviceLastData, setDeviceLastData] = useState<LastEventData>({});
    //Effects
    useEffect(() => {
        const deviceDataContent = lastData[device._id];
        //We validate the data dictionary
        if(!deviceDataContent)
            return;
        setDeviceLastData(deviceDataContent);
    }, [device, lastData]);
    //Web sockets message, to update the last device data record
    useWebSocketMessage((deviceData: IoTDeviceDataPrimitives) => {
        updateLastDeviceData(deviceData);
    }, 'IoTDeviceData');

    /**
     * Todo, devolver la funcion getEventTypeWidget en el map, en lugar del DeviceDataWidget.
     * Dicha función buscará el componente a renderizar en el diccionario de componentes por eventKey ()
     */
    return (
        <>
            {
                Object.entries(deviceLastData)
                    .map(([eventKey, value]) => (
                    getWidgetComponent({
                        key: value._id,
                        event: value,
                        device,
                        eventKey,
                        eventData: value.value,
                        deviceType: device.type,
                    })
                ))

            }
        </>
    )
}

export default WidgetDataRenderer;