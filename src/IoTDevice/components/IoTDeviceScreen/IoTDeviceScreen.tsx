import React from 'react';
//Components
import DevicesList from '../DevicesList/DevicesList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import LinkDeviceModal from '../LinkDeviceModal/LinkDeviceModal';
//Styled components
import { LinkDeviceButton } from '../DevicesList/DevicesList.styles';
//Hooks
import useModal from '../../../Shared/store/hooks/modal/useModal';


const IoTDeviceScreen: React.FC = () => {
    /**
     * Hooks
     */
    //Modal
    const { showModal } = useModal();

    //Render
    return (
        <ScreenContainer
            section = 'Dispositivos'
            padding = '1rem'
        >
            <LinkDeviceButton 
                onClick = { showModal }
            />
            <DevicesList />
            <LinkDeviceModal />
        </ScreenContainer>
    );
}
export default IoTDeviceScreen;
