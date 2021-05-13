import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
//Components
import Label from '../Label';
//Styled components
import { LabelStyledIcon, LabelWithIconContainer } from './LabelWithIcon.styles';

interface LabelWithIconProps extends React.HTMLAttributes<HTMLLabelElement> {
    icon: IconDefinition;
    text?: string | React.ReactElement;
    color?: string;
    fontSize?: number | string;
    className?: string;
}


const LabelWithIcon: React.FC<LabelWithIconProps> = ({
    text,
    icon,
    color,
    style,
    children,
    fontSize,
    className,
}) => (
    <LabelWithIconContainer
        className = { className }
    >
        <LabelStyledIcon 
            icon = { icon }
            fontSize = { fontSize }
            color = { color }
        />
        <Label
            color = { color }
            style = { style }
            fontSize = { fontSize }
        >
            { text || children }    
        </Label>
    </LabelWithIconContainer>
);

export default LabelWithIcon;