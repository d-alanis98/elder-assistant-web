import styled from 'styled-components';
//Constants
import { HEADER_HEIGHT } from '../../Header/Header.styles';
import { layoutConstants } from '../../Layout/Layout';

interface ScreenScrollContainerProps {
    padding?: string;
}

export const ScreenScrollContainer = styled.div<ScreenScrollContainerProps>`${({ 
    theme,
    padding 
}) => `
    position: relative;
    height: 100%;
    display: flex;
    margin-left: ${ HEADER_HEIGHT }px;
    flex-direction: column;
    background-color: ${ theme.backgroundColor };
    padding: ${ padding || '0' };
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        margin-left: 0;
        margin-bottom: ${ HEADER_HEIGHT }px;
        padding-bottom: ${ HEADER_HEIGHT }px;
    }
`}`;