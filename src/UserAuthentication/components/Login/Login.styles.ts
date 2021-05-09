import styled from 'styled-components';
//Theme
import { darkTheme } from '../../../Shared/components/Theme/constants/theme';


export const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    padding: 20px;
    background-color: #457b9d;
    margin: 0;
`;

export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255,0.85);
    padding: 30px 15px;
    border-radius: 10px;
    z-index: 90;
    width: clamp(200px, 100%, 600px);
    margin: 0 auto;
`;


export const LoginInput = styled.input`${({ theme }) => `
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

export const LoginIllustration = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    width: clamp(200px, 100%, 350px);
    z-index: 10;
`;

export const RegisterLinkContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`