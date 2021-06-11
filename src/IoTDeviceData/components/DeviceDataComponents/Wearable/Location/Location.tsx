import React from 'react';
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
    /**
     * Hooks
     */
    //State
    const [lastUpdate, setLastUpdate] = React.useState<string | null>(null);

    //Callbacks
    const updateDateDifference = React.useCallback(() => {
        setLastUpdate(
            DateHelper
                .getDateDifferenceFromIsoString(event.issuedAt)
        );
    }, [
        event,
        setLastUpdate
    ]);

    //Effects
    React.useEffect(() => {
        updateDateDifference();
        //We set the update interval
        const interval = setInterval(
            updateDateDifference, 
            10_000
        );
        //Cleanup
        return () => clearInterval(interval);
    }, [updateDateDifference]);

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
    eventData: LocationData;
}

const LocationMap: React.FC<LocationMapProps> = ({
    eventData: { lat, lon: lng }
}) => (
    <Map 
        zoom = { 15 }
        center = {{ lat, lng }}
        marker = {{ lat, lng }}
    />
);

interface LocationData {
    lat: number;
    lon: number;
}