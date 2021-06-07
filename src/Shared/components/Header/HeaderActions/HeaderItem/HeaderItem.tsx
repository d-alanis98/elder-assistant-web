import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
//Styled components
import { HeaderItemContainer, HeaderItemIcon, HeaderItemIconContainer, HeaderItemLabel } from './HeaderItem.styles';
//Icons
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface HeaderItemProps {
    icon?: IconDefinition;
    active: Boolean;
    section: string;
    display?: boolean;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    badgeText?: string | number;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
    icon,
    active,
    section,
    display,
    onClick,
    children,
    badgeText
}) => {

    return (
        <HeaderItemContainer
            onClick = { onClick }
        >
            { 
                children || (
                    <HeaderItemIconContainer>
                        <HeaderItemIcon 
                            icon = { icon || faUser }
                            active = { active }
                            badgeText = { badgeText }
                        />
                    </HeaderItemIconContainer>
                )
            }
            <HeaderItemLabel
                display = { display }
            >
                { section }
            </HeaderItemLabel>
        </HeaderItemContainer>
    );
}

export default HeaderItem;