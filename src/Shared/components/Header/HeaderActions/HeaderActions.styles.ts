import styled from 'styled-components';
import { layoutConstants } from '../../Layout/Layout';

export const HeaderActionsContainer = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    list-style: none;
    padding: 5px;

    & > li {
        margin-bottom: 0.75rem;
    }

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        padding: 2px;
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-left: auto;
        & > li {
            margin-bottom: 0rem;
        }
    }
`