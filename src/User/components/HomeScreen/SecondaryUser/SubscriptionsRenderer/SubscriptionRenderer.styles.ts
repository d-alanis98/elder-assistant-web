import styled from 'styled-components';
//Components
import Label from '../../../../../Shared/components/Layout/Labels/Label';
import Collapse from '../../../../../Shared/components/Layout/Collapse/Collapse';


export const SubscriptionRendererUser = styled(Collapse)`
`;

export const SubscriptionRendererTitle = styled(Label)`${({ theme }) => `
    font-size: 1.25rem;
    font-weight: 600;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: ${ theme.backgroundColor };
    z-index: 99;
    padding: 0.75rem 0.5rem;
    width: 100%;
`}`;