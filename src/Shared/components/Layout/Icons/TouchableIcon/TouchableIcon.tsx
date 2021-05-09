import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
//Styled components
import { TouchableIconContainer, StyledTouchableIcon, TouchableIconBadgeContainer, TouchableIconBadgeText } from './TouchableIcon.styles';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';


export interface TouchableIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: IconDefinition;
    size?: SizeProp;
    width?: number;
    height?: number;
    badgeText?: string | number;
}

const TouchableIcon: React.FC<TouchableIconProps> = ({
    icon,
    size = '1x',
    width,
    height,
    badgeText,
    ...restProps
}) => (
    <TouchableIconContainer
        icon = { icon }
        size = { size }
        width = { width }
        height = { height }
        { ...restProps }
    >
        <StyledTouchableIcon 
            icon = { icon }
            size = { size }
        />
        {
            badgeText && (
                <TouchableIconBadgeContainer 
                    icon = { icon }
                    badgeText = { badgeText }
                >
                    <TouchableIconBadgeText>{ badgeText }</TouchableIconBadgeText>
                </TouchableIconBadgeContainer>
            )
        }
    </TouchableIconContainer>
);

export default TouchableIcon;