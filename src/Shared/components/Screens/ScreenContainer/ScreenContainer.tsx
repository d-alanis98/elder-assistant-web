import React, { useContext, useEffect } from 'react';
//Components
import Label from '../../Layout/Labels/Label';
//Styled components
import { ScreenScrollContainer } from './ScreenContainer.styles';
//Context
import CurrentScreenContext from '../context/CurrentScreenContext';
//Hooks
import useCurrentScreen from '../../Navigation/hooks/useCurrentScreen';


interface Props extends React.HTMLAttributes<HTMLDivElement> {
    section?: string | React.ReactElement;
}

const ScreenContainer: React.FC<Props> = ({ 
    section,
    children,
}) => {
    /**
     * Hooks
     */
    //Current screen
    const currentScreen = useCurrentScreen();
    //Context consumer
    const { setCurrentScreen } = useContext(CurrentScreenContext);
    //Effects
    useEffect(() => {
        //We set the current screen at context level
        setCurrentScreen?.(currentScreen);
    }, [currentScreen, setCurrentScreen]);

    return (
        <>
            <ScreenScrollContainer>
                { 

                    <ScreenContent 
                        title = { section }
                        children = { children }
                    />
                }    
            </ScreenScrollContainer>
        </>
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
