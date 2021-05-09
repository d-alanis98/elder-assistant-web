import styled from 'styled-components';

//Size constants
export const HEADER_HEIGHT = 60;

//Styles
export const HeaderContainer = styled.div`${({ theme }) => `
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;
    height: ${ HEADER_HEIGHT }px;
    background-color: ${ theme.secondaryColor };
`}`;

export const HeaderTitle = styled.p`${({ theme }) => `
    color: ${ theme.secondaryFontColor };
    font-size: 20px;
`}`;

const logoSize = HEADER_HEIGHT - 10;

export const HeaderLogo = styled.img`
    height: ${ logoSize}px;
    width: ${ logoSize }px;
    margin-right: 5px;
`;