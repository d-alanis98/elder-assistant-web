import React from 'react';
//Styled components
import { 
    LastLocationTime, 
    LastLocationLabel, 
    LastLocationLabelContainer, 
} from '../../../IoTDeviceData/components/DeviceDataComponents/Wearable/Location/Location.styles';
//Hooks
import useLastUpdate from '../../hooks/useLastUpdate';


interface LastUpdateProps {
    issueDate: string;
}
const LastUpdate: React.FC<LastUpdateProps> = ({
    issueDate
}) => {
    /**
     * Hooks
     */
    //Last update
    const lastUpdate = useLastUpdate(issueDate);
    
    //Render
    return (
        <LastLocationLabelContainer>
            <LastLocationLabel>
                Última actualización: 
            </LastLocationLabel>
            <LastLocationTime>
                { lastUpdate }
            </LastLocationTime>
        </LastLocationLabelContainer>
    );
}

export default LastUpdate;