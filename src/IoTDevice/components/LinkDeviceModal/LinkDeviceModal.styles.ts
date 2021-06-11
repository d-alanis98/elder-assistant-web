import styled from 'styled-components';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import TextInput from '../../../Shared/components/Layout/Input/TextInput/TextInput.styles';
import ButtonWithIcon from '../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
//Theme
import ThemeUtils from '../../../Shared/utils/Theme/ThemeUtils';
//Icons
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export const LinkDeviceModalTitle = styled(Label)`
    font-size: 1.4rem;
    font-weight: 600;
`;

export const LinkDeviceModalLabel = styled(Label)`
    font-size: 1.15rem;
    margin: 0.75rem 0;
    margin-right: auto;
    padding: 0.25rem;
`;

export const LinkDeviceModalInput = styled(TextInput)
    .attrs(props => ({
        ...(props as Object),
        placeholder: 'URI del dispositivo'
    }))`${({ theme }) => `
    height: 2.8rem;
    background-color: ${ ThemeUtils.getValueBasedOnTheme(
        theme, 
        'rgba(0,0,0,0.05)', 
        'rgba(255,255,255,0.09)'
    )}
`}`;


export const LinkDeviceButton = styled(ButtonWithIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faCheckCircle,
        margin: '0 auto',
        buttonText: 'Vincular',
        buttonType: 'success'
    }))`
    margin: 0.75rem auto!important;
`