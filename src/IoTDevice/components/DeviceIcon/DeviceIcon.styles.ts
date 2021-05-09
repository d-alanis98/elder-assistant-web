import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Theme
import { isDarkTheme } from '../../../Shared/components/Theme/constants/theme';


export const DeviceIconContainer = styled.div`${({ theme }) => `
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    background-color: ${ isDarkTheme(theme) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' };
    border: 1px solid ${ isDarkTheme(theme) ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' };
    margin-right: 10px;
`}`;

export const DeviceStyledIcon = styled(FontAwesomeIcon)`${({ theme }) => `
    color: ${ theme.fontColor };
    font-size: 25px;
`}`