import styled from 'styled-components';
//Props
import { ButtonProps } from './Button';


export const StyledButton = styled.button<ButtonProps>`${props => `
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: ${ props.width || '100%' };
    height: ${ props.height || '50px'};
    margin: ${ props.margin || '0'};
    margin-top: ${ props.marginTop || 0 }px;
    margin-bottom: ${ props.marginBottom || 0 }px;
    opacity: ${ props.disabled ? 0.5 : 1 };
    border: none;
    background-color: ${ getBackgroundColorByType(props) };
    border-radius: ${ props.borderRadius || 30 }px;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
`}`;


enum ButtonTypes {
    DANGER = 'danger',
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFORMATION = 'information'
}

const getBackgroundColorByType = (props: any) => {
    const { theme, buttonType, backgroundColor } = props;
    switch(buttonType) {
        case ButtonTypes.DANGER:
            return theme.alertColor;
        case ButtonTypes.PRIMARY:
            return theme.primaryColor;
        case ButtonTypes.SUCCESS:
            return theme.successColor;
        case ButtonTypes.WARNING:
            return theme.warningColor;
        case ButtonTypes.INFORMATION:
            return theme.informationColor;
        default:
            if(backgroundColor)
                return backgroundColor;
            return theme.primaryColor;
    }
}

interface ButtonTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    fontSize?: number | string;
}

export const StyledButtonText = styled.span<ButtonTextProps>`${({ theme, fontSize }) => `
    color: ${ theme.backgroundColor };
    font-family: sans-serif;
    font-size: ${ fontSize || 20}px;
`}`;