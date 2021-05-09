import React from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
//Components
import { ButtonProps } from '../Button';
import LabelWithIcon from '../../Labels/LabelWithIcon/LabelWithIcon';
//Styled components
import { ButtonWithIconContainer } from './ButtonWithIcon.styles';


interface ButtonWithIconProps extends ButtonProps {
    icon: IconDefinition;
    fontSize?: number;
    buttonText: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    icon,
    color = '#fff',
    onClick,
    fontSize = 18,
    buttonText,
    buttonType,
    ...restProps
}) => (
    <ButtonWithIconContainer
        onClick = { onClick }
        buttonType = { buttonType }
        { ...restProps }
    >
        <LabelWithIcon 
            icon = { icon }
            color = { color }
            fontSize = { fontSize }
        >
            { buttonText }
        </LabelWithIcon>


    </ButtonWithIconContainer>
);

export default ButtonWithIcon;
