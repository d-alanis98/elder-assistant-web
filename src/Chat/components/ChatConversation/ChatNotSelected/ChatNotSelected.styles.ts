import styled from 'styled-components';
//Components
import LabelWithIcon from '../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
//Icons
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

export const ChatNotSelectedContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ChatNotSelectedLabel = styled(LabelWithIcon)
    .attrs(props => ({
        ...(props as Object),
        icon: faHandPointLeft,
        color: '#999',
        fontSize: '2rem'
    }))`
    margin-bottom: 0.5rem;
`;

export const ChatNotSelectedIllustration = styled.img`
    width: clamp(100px, 100%, 200px);
    height: clamp(100px, auto, 300px);
    object-fit: contain;
`;