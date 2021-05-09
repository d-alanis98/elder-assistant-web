import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LabelWithIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

export const LabelStyledIcon = styled(FontAwesomeIcon)`${({ 
    theme, 
    color, 
    fontSize 
}) => `
    color: ${ color || theme.fontColor };
    font-size: ${ getFontSize(fontSize) || '1rem' };
    margin-right: 10px;
`}`


const getFontSize = (fontSize?: string | number) => (
    typeof fontSize === 'number'
        ? `${fontSize}px`
        : fontSize
);
