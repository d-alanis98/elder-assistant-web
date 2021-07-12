import styled from 'styled-components';
//Components
import Label from '../../../Shared/components/Layout/Labels/Label';
import TextInput from '../../../Shared/components/Layout/Input/TextInput/TextInput.styles';
import { FlexColumn, FlexRow } from '../../../Shared/components/Layout/Containers/Flexbox.styles';


export const ConfigureDeviceContainer = styled(FlexColumn)`
    width: clamp(360px, 100%, 600px);
    margin: 0 auto;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;

export const ConfigureDeviceNameInput = styled(TextInput)
    .attrs(props => ({
        ...(props as Object),
        placeholder: 'Nombre del dispositivo'
    }))`
    height: 3rem;  
`;

export const PillBoxConfigurationRow = styled(FlexRow)`
    width: 100%;
    align-items: center;
    justify-content: space-around;
`;

export const PillBoxConfigurationSectionContainer = styled(FlexRow)`
    width: 50%;
    align-items: center;
    justify-content: space-around;
`;

export const PillBoxConfigurationSectionKey = styled(Label)`
    font-size: 1rem;
    margin-right: 0.5rem;
`;

export const PillBoxConfigurationSectionInput = styled(TextInput)
    .attrs(props => ({
        ...(props as Object),
        placeholder: 'Horario'
    }))`
    height: 2.5rem;
    font-size: 1rem;
`;
export const ConfigureDeviceLabel = styled(Label)`
    font-size: 1.3rem;
    margin: 1rem 0;
    margin-right: auto;
`;