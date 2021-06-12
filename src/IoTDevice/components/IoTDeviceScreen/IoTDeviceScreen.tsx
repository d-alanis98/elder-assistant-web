import React from 'react';
//Components
import DevicesList from '../DevicesList/DevicesList';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import LinkDeviceModal from '../LinkDeviceModal/LinkDeviceModal';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';
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
        <PrimaryUserProtected
            showFallback
        >
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
        </PrimaryUserProtected>
    );
}
export default IoTDeviceScreen;
