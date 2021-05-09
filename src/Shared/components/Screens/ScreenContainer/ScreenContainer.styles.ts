import styled from 'styled-components';

export const ScreenScrollContainer = styled.div`${({ theme }) => `
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: ${ theme.backgroundColor };
`}`;