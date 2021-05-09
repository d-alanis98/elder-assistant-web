import React from 'react';
import { StyledLabel } from './Label.styles';


export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    color?: string;
    margin?: string | number;
    fontSize?: number | string;
    className?: string;
    fontFamily?: string;
    fontWeight?: string;
}


const Label: React.FC<LabelProps> = ({ 
    color,
    style,
    margin,
    fontSize,
    children,
    className,
    fontFamily,
    fontWeight
}) => (
    <StyledLabel
        color = { color }
        style = { style }
        margin = { margin }
        fontSize = { fontSize }
        className = { className }
        fontFamily = { fontFamily }
        fontWeight = { fontWeight }
    >
        { children }
    </StyledLabel>
);

export default Label;