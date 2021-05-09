import React from 'react';
//Components
import DeviceIcon from '../DeviceIcon/DeviceIcon';
//Styled components
import { DeviceName, DeviceRefreshButton, DeviceSettings, DevicesListContainer, DevicesListItem } from './DevicesList.styles';
//Hooks
import useDevices from '../../../Shared/store/hooks/devices/useDevices';
import LoadingText from '../../../Shared/components/Loaders/LoadingText';


interface DevicesListProps {
    showRefreshButton?: boolean;
}

const DevicesList: React.FC<DevicesListProps> = ({
    showRefreshButton = true,
}) => {

    /**
     * Hooks
     */
    //Devices
    const { devices, fetching, getDevices } = useDevices();

    if(fetching)
        return <LoadingText 
            text = 'Obteniendo dispositivos...'
        />

    return (
        <DevicesListContainer>
            <RefreshButton 
                getDevices = { getDevices }
                showRefreshButton = { showRefreshButton }
            />
            {
                devices.map(({ _id, name, type }) => (
                    <DevicesListItem
                        key = { _id }
                    >
                        <DeviceIcon 
                            deviceType = { type }
                        />
                        <DeviceName>{ name }</DeviceName>
                        <DeviceSettings />
                    </DevicesListItem>
                ))
            }
        </DevicesListContainer>
    );
}

export default DevicesList;


//Internal components

interface RefreshButtonProps {
    getDevices: () => void;
    showRefreshButton: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
    getDevices,
    showRefreshButton
}) => showRefreshButton 
    ? (
        <DeviceRefreshButton 
            onClick = { () => getDevices() }
        />
    )
    : null;