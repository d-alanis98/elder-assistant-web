import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Props
import { PasswordInputProps } from './PasswordInput';
//Theme
import { darkTheme } from '../../../Theme/constants/theme';


const DEFAULT_FONT_SIZE = 20;

export const PasswordInputContainer = styled.div<PasswordInputProps>`${({ 
    theme, 
    width,
    height,
    fontSize,
    fontColor,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    borderRadius,
    backgroundColor
}) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${ width || '100%' };
    height: ${ height || '60px' };
    color: ${ fontColor || theme.fontColor };
    padding: 5px;
    background-color: ${ backgroundColor || getDefaultBackgroundColor(theme.fontColor) };
    border-radius: ${ borderRadius || '5px' };
    margin-top: ${ marginTop };
    margin-left: ${ marginLeft };
    margin-right: ${ marginRight };
    margin-bottom: ${ marginBottom || '15px' };
    font-size: ${ getFontSize(fontSize) };
    &:focus-within {
        border: 1px solid rgba(0,0,0,0.2);
    }
`}`

export const PasswordInputField = styled.input<PasswordInputProps>`${({ 
    theme,
    fontSize,
    fontColor,
}) => `
    width: auto;
    flex-grow: 1;
    color: ${ fontColor || theme.fontColor };
    padding: 10px;
    font-size: ${ getFontSize(fontSize) };
`}`


export const PasswordInputIcon = styled(FontAwesomeIcon)`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
`;


const getFontSize = (fontSize?: number) => fontSize 
    ? `${fontSize}px`
    : `${DEFAULT_FONT_SIZE}px`;

const getDefaultBackgroundColor = (fontColor: string) => fontColor === darkTheme.fontColor 
    ? 'rgba(255,255,255, 0.09)'
    : 'rgba(0,0,0,0.05)';