import React from 'react';
//Components
import LastUpdate from '../../../../../Shared/components/LastUpdate/LastUpdate';
import { 
    LocationMap,
    LocationData 
} from '../Location/Location';
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


interface PanicAlertProps extends BaseWidgetProps {
    eventData: PanicAlertData;
}

const PanicAlert: React.FC<PanicAlertProps> = ({
    event,
    device,
    eventData
}) => (
    <DeviceDataWidget
        icon = { faExclamationCircle }
        widgetTitle = 'Alerta de panico'
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
    //Props
    const { location } = eventData;
    /**
     * Hooks
     */
     const { 
        isAlertAttended, 
        setPanicAlertAsAttended 
    } = usePanicAlerts();

    if(isAlertAttended(event._id))
        return <AttendedAlert />;
    return (
        <>
            <PanicAlertEmphasisText>
                Ubicación: 
            </PanicAlertEmphasisText>
            <LocationMap 
                mapHeight = { 200 }
                eventData = { location }
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
)


//Types
interface PanicAlertData {
    location: LocationData;
    audioUri?: string;
}