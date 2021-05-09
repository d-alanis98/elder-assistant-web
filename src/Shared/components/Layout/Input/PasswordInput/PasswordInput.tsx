import React, { useState, useCallback } from 'react';
//Styled components
import { PasswordInputIcon, PasswordInputContainer, PasswordInputField } from './PasswordInput.styles';
//Icons
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface PasswordInputProps extends React.HTMLAttributes<HTMLInputElement> {
    width?: number;
    height?: number;
    fontSize?: number;
    fontColor?: string;
    marginTop?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    borderRadius?: number | string;
    backgroundColor?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    width,
    height,
    fontSize,
    fontColor,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    borderRadius,
    backgroundColor,
    ...restProps
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const getIconName = useCallback((): IconDefinition => showPassword 
        ? faEye
        : faEyeSlash
    , [showPassword]);

    return (
        <PasswordInputContainer
            width = { width }
            height = { height }
            fontSize = { fontSize }
            fontColor = { fontColor }
            marginTop = { marginTop }
            marginLeft = { marginLeft }
            marginRight = { marginRight }
            marginBottom = { marginBottom }
            borderRadius = { borderRadius }
            backgroundColor = { backgroundColor }
        
        >
            <PasswordInputField 
                type = { showPassword ? 'text' : 'password' }
                fontSize = { fontSize }
                fontColor = { fontColor }
                { ...restProps }
            />
            <ShowOrHideIcon 
                iconSize = { fontSize }
                getIconName = { getIconName }
                setShowPassword = { setShowPassword }
            />
        </PasswordInputContainer>
    )
}

export default PasswordInput;


interface ShowOrHideIconProps {
    iconSize?: number;
    getIconName: () => IconDefinition;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowOrHideIcon: React.FC<ShowOrHideIconProps> = ({
    iconSize,
    getIconName,
    setShowPassword
}) => (
    <div
        style = {{ 
            width: iconSize ? iconSize + 10 : 30, 
            display: 'flex',
            padding: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        onClick = { () => setShowPassword(prevState => !prevState) }
    >
        <PasswordInputIcon
            icon = { getIconName() }
            size = 'sm'
        />
    </div>
)