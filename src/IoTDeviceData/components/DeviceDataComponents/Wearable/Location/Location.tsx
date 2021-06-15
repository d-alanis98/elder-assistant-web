import React from 'react';
//Components
import Map from '../../../../../Shared/components/Map/Map';
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Styled components
import { LastLocationLabel, LastLocationLabelContainer, LastLocationTime } from './Location.styles';
//Hooks
import useLastUpdate from '../../../../../Shared/hooks/useLastUpdate';
//Icons
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface LocationProps extends BaseWidgetProps {
    eventData: LocationData;
}

const Location: React.FC<LocationProps> = ({
    event,
    eventData
}) => {
    /**
     * Hooks
     */
    //Last update date label
    const lastUpdate = useLastUpdate(event.issuedAt);

    return (
        <DeviceDataWidget
            icon = { faMapMarkerAlt }
            widgetTitle = 'Última ubicación'
        >
            <LocationMap 
                eventData = { eventData }
            /> 
            <LastLocationLabelContainer>
                <LastLocationLabel>
                    Última actualización: 
                </LastLocationLabel>
                <LastLocationTime>
                    { lastUpdate }
                </LastLocationTime>
            </LastLocationLabelContainer>
        </DeviceDataWidget>
    );
}

export default React.memo(Location);


//Internal components
interface LocationMapProps {
    mapWidth?: number | string;
    mapHeight?: number | string;
    eventData: LocationData;
}

export const LocationMap: React.FC<LocationMapProps> = ({
    mapWidth,
    mapHeight,
    eventData: { lat, lon: lng }
}) => (
    <Map 
        zoom = { 15 }
        center = {{ lat, lng }}
        marker = {{ lat, lng }}
        mapWidth = { mapWidth }
        mapHeight = { mapHeight }
    />
);

export interface LocationData {
    lat: number;
    lon: number;
}