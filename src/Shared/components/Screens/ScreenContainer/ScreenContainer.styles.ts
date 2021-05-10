import styled from 'styled-components';
//Constants
import { HEADER_HEIGHT } from '../../Header/Header.styles';
import { layoutConstants } from '../../Layout/Layout';

export const ScreenScrollContainer = styled.div`${({ theme }) => `
    flex-grow: 1;
    display: flex;
    padding: 1rem;
    margin-left: ${ HEADER_HEIGHT }px;
    flex-direction: column;
    overflow-y: auto;
    background-color: ${ theme.backgroundColor };

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        margin-left: 0;
        margin-bottom: ${ HEADER_HEIGHT }px;
    }
`}`;