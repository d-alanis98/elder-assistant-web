import React, { useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
//Components
import EmptyData from '../../../Shared/components/Miscelaneous/EmptyData/EmptyData';
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
import WidgetDataRenderer from './WidgetDataRenderer/WidgetDataRenderer';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
//Hooks
import useDeviceData from '../../../Shared/store/hooks/deviceData/useDeviceData';
//Helpers
import ObjectHelper from '../../../Shared/utils/Miscelaneous/ObjectHelper';

interface DeviceDataRendererProps {
    devices: IoTDevicePrimitives[];
}

const DeviceDataRenderer: React.FC<DeviceDataRendererProps> = ({
    devices
}) => {
    /**
     * Hooks
     */
    //Device data
    const { lastData, getLastDeviceData } = useDeviceData();
    //State
    const [fetching, setFetching] = React.useState(false)

    //Effects
    useEffect(() => {
        setFetching(ObjectHelper.isEmpty(lastData));
    }, [lastData]);

    useEffect(() => {
        if(!devices || devices.length === 0)
            return;
        //We retrieve the last data for each device
        devices.forEach(device => {
            getLastDeviceData(device._id, device.ownedBy)
                .then(() => setFetching(false))
                .catch(() => setFetching(false));
        });
    }, [
        devices, 
        getLastDeviceData
    ]);

    if(fetching)
        return <LoadingText />

    if(
        devices.length === 0 || 
        ObjectHelper.isEmpty(lastData)
    )
        return <EmptyData />

    //Render
    return (
        <LoadScript
            googleMapsApiKey = { process.env.REACT_APP_GOOGLE_MAPS_KEY || '' }
        >
            {
                devices.map(device => (
                    <WidgetDataRenderer 
                        key = { device._id }
                        device = { device }
                    />
                ))
            }
        </LoadScript>
    );
}

export default DeviceDataRenderer;