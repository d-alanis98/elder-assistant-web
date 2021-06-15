import styled from 'styled-components';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import TouchableIcon from '../../../../../Shared/components/Layout/Icons/TouchableIcon/TouchableIcon';
import ButtonWithIcon from '../../../../../Shared/components/Layout/Buttons/ButtonWithIcon/ButtonWithIcon';
//Icons
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface PanicAlertText {
    fontColor?: string;
}
export const PanicAlertEmphasisText = styled(Label)<PanicAlertText>`
    font-size: 1.4rem;
    margin: 0.5rem 0;
    color: ${({ 
        theme,
        fontColor
    }) => fontColor || theme.fontColor };
`;

export const PanicAlertAttendedContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin: auto 0;
    border-radius: 1rem;
`

export const AttendPanicAlertButton = styled(ButtonWithIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faCheckCircle,
        buttonText: 'Marcar como atendida',
        buttonType: 'success'
    }))`
    margin: 0.75rem 0;
`;

export const PanicAlertAttendedIcon = styled(TouchableIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faCheckCircle,
    }))`
    font-size: 5rem;
    color: ${({ theme }) => theme.secondaryFontColor };
`;