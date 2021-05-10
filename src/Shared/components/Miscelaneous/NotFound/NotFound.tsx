import React from 'react';
import styled from 'styled-components';
//Components
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon/LabelWithIcon';
//Icons
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
//Layout constants
import { HEADER_HEIGHT } from '../../Header/Header.styles';
import { layoutConstants } from '../../Layout/Layout';

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
const NotFoundContainer = styled.div`${({ theme }) => `
    height: 100%;
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background-color: ${ theme.backgroundColor };
    margin: left: ${ HEADER_HEIGHT }px;

    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        margin-left: 0;
        margin-bottom: ${ HEADER_HEIGHT }px;
    }
`}`;

const NotFoundLabel = styled(LabelWithIcon).attrs(props => ({
    ...(props as Object),
    icon: faExclamationTriangle,
    text: 'No se encontró el recurso solicitado',
    color: props.theme.secondaryFontColor,
    fontSize: '1.8rem',
}))`
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        font-size: 1.5rem;
    }
`;

const NotFoundIllustration = styled.img`
    height: clamp(150px, 100%, 250px);
    width: auto;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.8;
    
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        bottom: ${ HEADER_HEIGHT }px;
    }
`;

const TopNotFoundIllustration = styled.img`
    height: clamp(150px, 100%, 200px);
    width: auto;
    position: absolute;
    top: 0;
    left: calc(${ HEADER_HEIGHT }px - 1.25rem);
    opacity: 0.75;
    @media (max-width: ${ layoutConstants.breakPoints.lg }) {
        left: -2rem;
    }
`