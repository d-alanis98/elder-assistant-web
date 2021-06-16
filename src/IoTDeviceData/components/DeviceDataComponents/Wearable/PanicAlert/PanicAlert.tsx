import React, { useCallback } from 'react';
//Components
import LastUpdate from '../../../../../Shared/components/LastUpdate/LastUpdate';
import { LocationMap } from '../Location/Location';
import SecondaryUserProtected from '../../../../../Shared/components/Screens/SecondaryUserProtected';
//Styled components
import { 
    PanicAlertAttendedIcon, 
    PanicAlertEmphasisText,
    AttendPanicAlertButton,
    PanicAlertAttendedContainer 
} from './PanicAlert.styles';
//Hooks
import usePanicAlerts from '../../../../../Shared/store/hooks/deviceData/usePanicAlerts';
//Props
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Icons
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IoTDeviceDataPrimitives } from '../../../../domain/IoTDeviceData';


interface PanicAlertProps extends BaseWidgetProps {
    eventData: string;
}

const PanicAlert: React.FC<PanicAlertProps> = ({
    event,
    device,
    eventData
}) => (
    <DeviceDataWidget
        icon = { faExclamationCircle }
        widgetTitle = 'Alerta de pánico'
    >
        <PanicAlertRenderer 
            key = { event._id }
            event = { event }
            device = { device }
            eventData = { eventData }
        />
        <LastUpdate 
            issueDate = { event.issuedAt }
        />
    </DeviceDataWidget>
)

export default PanicAlert;

//Internal components
const PanicAlertRenderer: React.FC<PanicAlertProps> = ({
    event,
    eventData
}) => {
    /**
     * Hooks
     */
    //Panic alerts
     const { 
        isAlertAttended, 
        setPanicAlertAsAttended 
    } = usePanicAlerts();

    //Callbacks
    const getLocation = useCallback(() => {
        //We parse the location from the eventData string
        const { location } = JSON.parse(eventData);
        return location;
    }, [eventData]);
    


    if(isAlertAttended(event._id))
        return <AttendedAlert />;
    return (
        <>
            <AudioFile 
                event = { event }
            />
            <PanicAlertEmphasisText>
                Ubicación de la alerta: 
            </PanicAlertEmphasisText>
            <LocationMap 
                mapHeight = { 200 }
                eventData = { getLocation() }
            />
            <SecondaryUserProtected>
                <AttendPanicAlertButton
                    onClick = { () => setPanicAlertAsAttended(event._id) }
                />
            </SecondaryUserProtected>
        </>
    )
}


const AttendedAlert: React.FC = () => (
    <PanicAlertAttendedContainer>
        <PanicAlertAttendedIcon />
        <PanicAlertEmphasisText
            fontColor = '#aaaaaa'
        >
            Alerta atendida
        </PanicAlertEmphasisText>
    </PanicAlertAttendedContainer>
);


interface AudioFileProps {
    event: IoTDeviceDataPrimitives;
}
const AudioFile: React.FC<AudioFileProps> = ({
    event
}) => event.filePath
    ? (
        <>
            <PanicAlertEmphasisText>
                Audio de emergencia:
            </PanicAlertEmphasisText>
            <audio
                src = { `${ process.env.REACT_APP_SERVER_URL }/PanicAlerts/${ event.filePath }` }
                controls
            >
                Audio not supported
            </audio>
        </>
    )
    : null;
