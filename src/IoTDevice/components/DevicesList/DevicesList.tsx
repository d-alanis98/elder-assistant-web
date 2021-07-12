import React, { useCallback } from 'react';
//Components
import EmptyData from '../../../Shared/components/Miscelaneous/EmptyData/EmptyData';
import DeviceIcon from '../DeviceIcon/DeviceIcon';
import LoadingText from '../../../Shared/components/Loaders/LoadingText';
//Styled components
import { DeviceName, DeviceRefreshButton, DeviceSettings, DevicesListContainer, DevicesListItem } from './DevicesList.styles';
//Hooks
import useDevices from '../../../Shared/store/hooks/devices/useDevices';
//Helpers
import ObjectHelper from '../../../Shared/utils/Miscelaneous/ObjectHelper';
import { useHistory } from 'react-router-dom';


interface DevicesListProps {
    showRefreshButton?: boolean;
}

const DevicesList: React.FC<DevicesListProps> = ({
    showRefreshButton = true,
}) => {

    /**
     * Hooks
     */
    //History
    const history = useHistory();
    //Devices
    const { devices, fetching, getDevices } = useDevices();

    //Callbacks
    const redirectToConfiguration = useCallback((deviceId: string) => {
        history.push(`/devices/${ deviceId }`);
    }, [
        history
    ])

    if(fetching && ObjectHelper.isEmpty(devices))
        return <LoadingText 
            text = 'Obteniendo dispositivos...'
        />
    
    if(ObjectHelper.isEmpty(devices))
        return <EmptyData 
            text = 'Sin dispositivos'
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
                        onClick = { _ => redirectToConfiguration(_id) }
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