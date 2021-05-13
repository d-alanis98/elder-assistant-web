import React from 'react';
//Components
import DeviceDataRenderer from '../../../../IoTDeviceData/components/DeviceDataRenderer/DeviceDataRenderer';
//Styled components
import { PrimaryUserScreenContainer } from './PrimaryUserScreen.styles';
//Hooks
import useDevices from '../../../../Shared/store/hooks/devices/useDevices';

const PrimaryUserScreen: React.FC = () => {
    const { devices } = useDevices();
    return (
        <PrimaryUserScreenContainer>
            <DeviceDataRenderer 
                devices = { devices }
            />
        </PrimaryUserScreenContainer>
    )
};

export default PrimaryUserScreen;