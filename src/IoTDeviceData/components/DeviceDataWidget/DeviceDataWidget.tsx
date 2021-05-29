import React from 'react';
//Domain
import { IoTDevicePrimitives } from '../../../IoTDevice/domain/IoTDevice';
import { IoTDeviceDataPrimitives } from '../../domain/IoTDeviceData';
//Styled components
import { DeviceDataWidgetContainer, DeviceDataWidgetTitleContainer, DeviceDataWidgetTitleIcon, DeviceDataWidgetTitleText } from './DeviceDataWidget.styles';
//Icon
import { faMicrochip, IconDefinition } from '@fortawesome/free-solid-svg-icons';


export interface DeviceDataWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: IconDefinition;
    width?: number | string;
    height?: number | string;
    fontSize?: number;
    fontWeight?: string;
    widgetTitle?: string;
    borderRadius?: number;
    marginBottom?: number;
    backgroundColor?: string;
}

const DeviceDataWidget: React.FC<DeviceDataWidgetProps> = ({
    icon,
    width,
    height,
    children,
    fontSize,
    fontWeight,
    widgetTitle,
    borderRadius,
    marginBottom,
    backgroundColor
}) => {
    return (
        <DeviceDataWidgetContainer
            width = { width }
            height = { height }
            borderRadius = { borderRadius }
            marginBottom = { marginBottom }
            backgroundColor = { backgroundColor }
        >
            <DeviceDataWidgetTitleContainer>
                <DeviceDataWidgetTitleIcon 
                    icon = { icon || faMicrochip }
                />
                <DeviceDataWidgetTitleText
                    fontSize = { fontSize }
                    fontWeight = { fontWeight }
                >
                    { widgetTitle }
                </DeviceDataWidgetTitleText>
            </DeviceDataWidgetTitleContainer>
            { children }
        </DeviceDataWidgetContainer>
    );
}

export default DeviceDataWidget;

//Helpers
export interface BaseWidgetProps {
    key: string;
    event: IoTDeviceDataPrimitives;
    device: IoTDevicePrimitives;
    eventData: string | Object;
}