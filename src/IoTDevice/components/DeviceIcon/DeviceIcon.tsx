import React from 'react';
//Domain
import { IoTDeviceTypes } from '../../domain/value-objects/IoTDeviceTypes';
//Styled components
import { DeviceIconContainer, DeviceStyledIcon } from './DeviceIcon.styles';
//Icons
import { faClock, faMicrochip, faPills } from '@fortawesome/free-solid-svg-icons';


interface DeviceIconProps {
    deviceType: string,
}

const DeviceIcon: React.FC<DeviceIconProps> = ({
    deviceType
}) => (
    <DeviceIconContainer>
        <DeviceStyledIcon
            icon = { getDeviceIconByType(deviceType) } 
        />
    </DeviceIconContainer>
);

export default DeviceIcon;


//Helpers
const getDeviceIconByType = (deviceType: string) => {
    switch(deviceType) {
        case IoTDeviceTypes.PILLBOX:
            return faPills;
        case IoTDeviceTypes.WEARABLE:
            return faClock;
        default:
            return faMicrochip;
    } 
}