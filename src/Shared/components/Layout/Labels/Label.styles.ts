import styled from 'styled-components';
//Props
import { LabelProps } from './Label';

export const StyledLabel = styled.label<LabelProps>`${({ 
    theme,
    color,
    margin,
    fontSize,
    fontWeight,
}) => `
    color: ${ color || theme.fontColor };
    margin: ${ margin || '0' };
    font-size: ${ getFontSize(fontSize) || '1rem' };
    font-family: sans-serif;
    font-weight: ${ fontWeight || 'normal' };
    text-align: center;
`}`;


const getFontSize = (fontSize?: string | number) => (
    typeof fontSize === 'number'
        ? `${fontSize}px`
        : fontSize
);
