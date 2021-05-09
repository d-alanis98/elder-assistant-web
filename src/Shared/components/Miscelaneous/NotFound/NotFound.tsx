import React from 'react';
import styled from 'styled-components';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon/LabelWithIcon';
//Icons
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
//Dimensions
import { HEADER_HEIGHT } from '../../Header/Header.styles';

const NotFound: React.FC = () => (
    <NotFoundContainer>
        <NotFoundLabel />
        <NotFoundIllustration 
            src = '/assets/illustrations/clip-252.png'
        />
        <TopNotFoundIllustration
            src = '/assets/illustrations/pablo-816.png'
        />
    </NotFoundContainer>
);

export default NotFound;

//Styled components
const NotFoundContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background-color: #333;
`;

const NotFoundLabel = styled(LabelWithIcon).attrs(props => ({
    ...(props as Object),
    icon: faExclamationTriangle,
    text: 'No se encontró el recurso solicitado',
    color: props.theme.secondaryFontColor,
    fontSize: '2rem',
}))`

`;

const NotFoundIllustration = styled.img`
    height: clamp(150px, 100%, 250px);
    width: auto;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.8;
`;

const TopNotFoundIllustration = styled.img`
    height: clamp(150px, 100%, 200px);
    width: auto;
    position: absolute;
    top: ${ HEADER_HEIGHT }px;
    left: -2rem;
    opacity: 0.75;
`