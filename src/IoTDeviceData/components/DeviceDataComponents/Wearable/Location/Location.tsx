import React from 'react';
//Domain
import { IoTDeviceDataPrimitives } from '../../../../domain/IoTDeviceData';
//Components
import Map from '../../../../../Shared/components/Map/Map';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Styled components
import { LastLocationLabel, LastLocationLabelContainer, LastLocationTime } from './Location.styles';
//Helpers
import DateHelper from '../../../../../Shared/utils/Date/DateHelper';
//Icons
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface LocationProps extends BaseWidgetProps {
    eventData: LocationData;
}

const Location: React.FC<LocationProps> = ({
    event,
    eventData
}) => {
    
    return (
        <DeviceDataWidget
            icon = { faMapMarkerAlt }
            widgetTitle = 'Última ubicación'
        >
            <LocationMap 
                event = { event }
                eventData = { eventData }
            /> 
            <LastLocationLabelContainer>
                <LastLocationLabel>
                    Última actualización: 
                </LastLocationLabel>
                <LastLocationTime>
                    { DateHelper.getDateDifferenceFromIsoString(event.issuedAt) }
                </LastLocationTime>
            </LastLocationLabelContainer>
        </DeviceDataWidget>
    );
}

export default Location;


//Internal components
interface LocationMapProps {
    event: IoTDeviceDataPrimitives;
    eventData: LocationData;
}

const LocationMap: React.FC<LocationMapProps> = ({
    event,
    eventData
}) => {
    const { lat, lon: lng } = eventData;

    //Render
    return <Map 
        zoom = { 15 }
        center = {{ lat, lng }}
        markers = {[{
            id: event._id,
            position: { lat, lng }
        }]}
    />
};

interface LocationData {
    lat: number;
    lon: number;
}