import React from 'react';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
//Icons
import { NavigationItemContainer, NavigationItemIcon, NavigationItemLabel } from './NavigationItem.styles';

interface Props {
    icon: IconDefinition,
    active: boolean,
    section: string;
    onClick?: (section: string) => void;
    iconSize?: SizeProp;
    iconColor?: string;
    sectionLabel?: string;
    showSectionLabel?: boolean;
};

const NavigationItem: React.FC<Props> = ({
    icon,
    active,
    section,
    onClick,
    iconSize,
    iconColor,
    sectionLabel,
    showSectionLabel
}) => (
    <div
        onClick = { () => onClick?.(section) }
    >
        <NavigationItemContainer>
            <NavigationItemIcon 
                icon = { icon }
                size = { iconSize }
                color = { iconColor }
                active = { active }
            />
            {
                showSectionLabel && (
                    <NavigationItemLabel
                        active = { active }
                        iconColor = { iconColor }
                    >
                        { sectionLabel }
                    </NavigationItemLabel>
                )
            }
        </NavigationItemContainer>
    </div>
);


export default NavigationItem;