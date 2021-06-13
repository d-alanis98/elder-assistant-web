import styled from 'styled-components';
//Components
import Button from '../../../../../Shared/components/Layout/Buttons/Button';
//Theme
import ThemeUtils from '../../../../../Shared/utils/Theme/ThemeUtils';

const SubscriptionButton = styled(Button)
    .attrs(props => ({
        ...(props as Object),
        fontSize: 15
    }))`${({ theme }) => `
    height: 2rem;
    padding: 0.25rem;
    margin: 0.1rem;
    max-width: 8rem;
    color: ${ theme.fontColor };
    font-size: 0.5rem;
    border-radius: 0.25rem;
`}`;

export const AcceptSubscriptionButton = styled(SubscriptionButton)
    .attrs(props => ({
        ...(props as Object),
        children: 'Aceptar',
        buttonType: 'primary',
    }))`
    margin-right: 1.5rem;    
`;

export const RejectSubscriptionButton = styled(SubscriptionButton)
    .attrs(props => ({
        ...(props as Object),
        children: 'Rechazar',
    }))`${({ theme }) => `
    background-color: ${ ThemeUtils.getThemedTranslucidBackground(theme, 0.35) };
`}`;