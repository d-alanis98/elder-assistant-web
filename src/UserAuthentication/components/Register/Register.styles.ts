import styled from 'styled-components';
//Theme
import { darkTheme } from '../../../Shared/components/Theme/constants/theme';


export const RegisterFormContainer = styled.div`
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255,0.85);
    padding: 1.5rem;
    border-radius: 10px;
    z-index: 90;
    margin-bottom: 60px;
    width: clamp(300px, 100%, 700px);
    margin: 0 auto;
`;


export const RegisterInput = styled.input`${({ theme }) => `
    height: 60px;
    color: ${ theme.fontColor };
    background-color: ${ theme.fontColor === darkTheme.fontColor 
        ? 'rgba(255,255,255, 0.09)'
        : 'rgba(0,0,0,0.05)'
    };
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 20px;
    border: none;
    &:focus {
        outline: none;
        border: 1px solid rgba(0,0,0,0.2);
    }
`}`;

const illustrationSize = document.body.clientWidth / 1.5;

export const RegisterIllustration = styled.img`
    position: absolute;
    bottom: -35px;
    left: 0;
    right: 0;
    justify-content: center;
    height: ${ illustrationSize }px;
    width: ${ illustrationSize }px;
    z-index: 10;
`