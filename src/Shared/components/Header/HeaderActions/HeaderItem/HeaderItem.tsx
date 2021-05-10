import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
//Styled components
import { HeaderItemContainer, HeaderItemIcon, HeaderItemIconContainer, HeaderItemLabel } from './HeaderItem.styles';
//Icons
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface HeaderItemProps {
    icon?: IconDefinition;
    section: string;
    display?: boolean;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    badgeText?: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({
    icon,
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
                children
                    ? children
                    : (
                        <HeaderItemIconContainer>
                            <HeaderItemIcon 
                                icon = { icon || faUser }
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