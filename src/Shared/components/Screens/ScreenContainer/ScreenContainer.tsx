import React from 'react';
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
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title }) => title 
    ?  typeof title === 'string'
        ? <Label fontSize='1.5rem' style={{ textAlign: 'center'}}>{ title }</Label>
        : title
    : null;

const ScreenContent: React.FC<ScreenTitleProps> = ({ title, children }) => (
    <>
        <ScreenTitle 
            title = { title }
        />
        { children }
    </>
);
