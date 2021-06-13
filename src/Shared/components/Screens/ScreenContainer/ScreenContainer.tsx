import React from 'react';
import styled from 'styled-components';
//Components
import Label from '../../Layout/Labels/Label';
//Styled components
import { ScreenScrollContainer } from './ScreenContainer.styles';
//Hooks
import useCurrentScreen from '../../Navigation/hooks/useCurrentScreen';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    section?: string | React.ReactElement;
    padding?: string;
}

const ScreenContainer: React.FC<Props> = ({ 
    section,
    padding = '1rem',
    children,
}) => {
    /**
     * Hooks
     */
    //Current screen, we just invoke it to set the current screen at mount
    useCurrentScreen();

    return (
        <ScreenScrollContainer
            padding = { padding }
        >
            { 

                <ScreenContent
                    title = { section }
                    children = { children }
                />
            }    
        </ScreenScrollContainer>
    );
}
export default ScreenContainer;

//Internal components

interface ScreenTitleProps {
    title?: string | React.ReactElement;
    className?: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ 
    title,
    className 
}) => title 
    ?  typeof title === 'string'
        ? (
            <Label 
                style = {{ textAlign: 'center'}}
                fontSize = '1.5rem' 
                className = { className }
            >
                { title }
            </Label>
        )
        : title
    : null;

const StyledScreenTitle = styled(ScreenTitle)`${({ theme }) => `
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background: ${ theme.backgroundColor };
    width: 100%;
    z-index: 99;
    padding: 0.75rem 0.5rem;
`}`;

const ScreenContent: React.FC<ScreenTitleProps> = ({ title, children }) => (
    <>
        <StyledScreenTitle 
            title = { title }
        />
        { children }
    </>
);


