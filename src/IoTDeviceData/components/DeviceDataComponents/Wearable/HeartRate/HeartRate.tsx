import React, { useCallback } from 'react';
//Components
import LastUpdate from '../../../../../Shared/components/LastUpdate/LastUpdate';
//Styled components
import { 
    HeartRateEntry,
    HeartRateEntryText,
    HeartRateContainer,  
    HeartRateIcon,
    HeartRateEntryEmphasis,
} from './HeartRate.styles';
//Props
import DeviceDataWidget, { BaseWidgetProps } from '../../../DeviceDataWidget/DeviceDataWidget';
//Icons
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';

interface HeartRateProps extends BaseWidgetProps {
    eventData: HeartRateData;
}


const HeartRate: React.FC<HeartRateProps> = ({
    event,
    eventData
}) => {
    //Props
    const { heartRate, saturation } = eventData;
    /**
     * Hooks
     */
    //Callbacks
    const getHeartRateStatus = useCallback(() => {
        if(heartRate >= 75 && heartRate <= 130)
            return 'excellent';
        if(heartRate > 130 && heartRate < 145)
            return 'moderate';
        return 'outOfRange';
    }, [heartRate]);

    const getSaturationStatus = useCallback(() => {
        if(saturation >= 95 && saturation <= 100)
            return 'excellent';
        if(saturation < 95 && saturation >= 90)
            return 'moderate';
        return 'outOfRange';
    }, [saturation]);

    return (
        <DeviceDataWidget
            icon = { faHeartbeat }
            widgetTitle = 'Ritmo cardiaco'
        >
            <HeartRateContainer>
                <HeartRateIcon 
                    heartRateStatus = { getHeartRateStatus() }
                />
                <HeartRateEntryEmphasis
                    heartRateStatus = { getHeartRateStatus() }
                >
                    { heartRate } BPM
                </HeartRateEntryEmphasis>
                <HeartRateEntry>
                <HeartRateEntryText>
                    SPO2:
                </HeartRateEntryText>
                <HeartRateEntryEmphasis
                    heartRateStatus = { getSaturationStatus() }
                >
                    { saturation.toFixed(0) }%
                </HeartRateEntryEmphasis>
                </HeartRateEntry>
                <LastUpdate 
                    issueDate = { event.issuedAt }
                />
            </HeartRateContainer>
        </DeviceDataWidget>
    )
}

export default HeartRate;

/**
 * Helpers
 */
//Types
interface HeartRateData {
    heartRate: number;
    saturation: number;
}