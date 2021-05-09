import styled from 'styled-components';
import { darkTheme } from '../../../Theme/constants/theme';


export const DateInputContainer = styled.div`${({ theme }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    color: ${ theme.fontColor };
    padding: 5px;
    background-color: ${ getBackgroundColor(theme.fontColor) };
    border-radius: 5px;
    margin-bottom: 15px;
    font-size: 20px;
`}`


const getBackgroundColor = (fontColor: string) => fontColor === darkTheme.fontColor 
    ? 'rgba(255,255,255, 0.09)'
    : 'rgba(0,0,0,0.05)';