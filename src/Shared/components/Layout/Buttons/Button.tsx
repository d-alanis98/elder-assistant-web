import React from 'react';
//Styles
import { StyledButton, StyledButtonText } from './Button.styles';



export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    color?: string;
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    onClick: (event?: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    fontSize?: number | string;
    marginTop?: number;
    buttonType?: 'danger' | 'primary' | 'success' | 'warning';
    marginBottom?: number;
    borderRadius?: number | string;
    backgroundColor?: string;
    accessibilityLabel?: string;
}


const Button: React.FC<ButtonProps> = ({ 
    color,
    width,
    height,
    onClick,
    disabled,
    children,
    fontSize,
    marginTop,
    buttonType = 'primary',
    marginBottom,
    borderRadius,
    backgroundColor,
    accessibilityLabel,
    ...extraProps
}) => (
    <StyledButton
        color = { color }
        width = { width }
        height = { height }
        onClick = { onClick }
        disabled = { disabled }
        marginTop = { marginTop }
        buttonType = { buttonType }
        marginBottom = { marginBottom }
        borderRadius = { borderRadius }
        backgroundColor = { backgroundColor }
        accessibilityLabel = { accessibilityLabel }
        { ...extraProps }
    >
        <StyledButtonText fontSize = { fontSize }>{ children }</StyledButtonText>
    </StyledButton>
);

export default Button;