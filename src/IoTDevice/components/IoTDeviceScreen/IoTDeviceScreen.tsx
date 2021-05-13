import React, { useState } from 'react';
//Components
import DevicesList from '../DevicesList/DevicesList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
//Styled components
import { LinkDeviceButton } from '../DevicesList/DevicesList.styles';
//Icons
import { faQrcode } from '@fortawesome/free-solid-svg-icons';


const IoTDeviceScreen: React.FC = () => {
    const [showLinkModal, setShowLinkModal] = useState(false);

    return (
        <ScreenContainer
            section = 'Dispositivos'
            padding = '1rem'
        >
            <LinkDeviceButton 
                icon = { faQrcode }
                onClick = { () => setShowLinkModal(true) }
                buttonText = 'Vincular dispositivo'
            />
            <DevicesList />
        </ScreenContainer>
    );
}
export default IoTDeviceScreen;
