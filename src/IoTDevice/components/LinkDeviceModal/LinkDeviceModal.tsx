import React, { useState } from 'react';
//Components
import Modal from '../../../Shared/components/Modal/Modal';
import ConditionalRendering from '../../../Shared/components/Layout/Containers/ConditionalRendering';
//Styled components
import { 
    LinkDeviceButton,
    LinkDeviceModalTitle,
    LinkDeviceModalLabel, 
    LinkDeviceModalInput,
} from './LinkDeviceModal.styles';
//Hooks
import useModal from '../../../Shared/store/hooks/modal/useModal';
import useDevices from '../../../Shared/store/hooks/devices/useDevices';

const LinkDeviceModal: React.FC = () => {
    /**
     * Hooks
     */
    //State
    const [deviceToLinkId, setDeviceToLinkId] = useState<string>('');
    //Devices
    const { linkDevice } = useDevices();
    //Modal
    const { hideModal } = useModal();
    //Callbacks
    const submitLinkRequest = React.useCallback(() => {
        linkDevice(deviceToLinkId)
            .then(() => {
                hideModal()
            })
            .catch(error => alert(error.message))
    }, [ 
        hideModal,
        linkDevice,
        deviceToLinkId 
    ]);

    return (
        <Modal>
            <LinkDeviceModalTitle>
                Vincular dispositivo
            </LinkDeviceModalTitle>
            <LinkDeviceModalLabel>
                Ingrese la URI del dispositivo:
            </LinkDeviceModalLabel>
            <LinkDeviceModalInput 
                onChange = { event => setDeviceToLinkId(event.target.value) }
            />
            <ConditionalRendering
                condition = { deviceToLinkId.length > 1 }
            >
                <LinkDeviceButton 
                    onClick = { submitLinkRequest }
                />
            </ConditionalRendering>
        </Modal>
    )
}

export default LinkDeviceModal;