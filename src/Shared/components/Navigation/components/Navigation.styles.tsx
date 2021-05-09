import styled from 'styled-components';

//Size constants
export const NAVIGATION_BAR_HEIGHT = 60;

export const NavigationContainer = styled.div`${({ theme }) => `
    height: ${NAVIGATION_BAR_HEIGHT}px;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
    color: ${ theme.fontColor }
    background-color: ${ theme.secondaryColor }
`}`;

