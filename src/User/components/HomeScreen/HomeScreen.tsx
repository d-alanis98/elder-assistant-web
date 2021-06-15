import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import PrimaryUserScreen from './PrimaryUser/PrimaryUserScreen';
import SecondaryUserScreen from './SecondaryUser/SecondaryUserScreen';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';
import SecondaryUserProtected from '../../../Shared/components/Screens/SecondaryUserProtected';
//Hooks
import { useAppSelector } from '../../../Shared/store/hooks';

const HomeScreen: React.FC = () => (
        <HomeScreenContainer>
            <PrimaryUserProtected>
                <PrimaryUserScreen />
            </PrimaryUserProtected>
            <SecondaryUserProtected>
                <SecondaryUserScreen />
            </SecondaryUserProtected>
        </HomeScreenContainer>
    );

export default HomeScreen;

//Internal components

const HomeScreenContainer: React.FC = ({ children }) => {
    /**
     * Hooks
     */
    //State selector
    const { type } = useAppSelector(state => state.user);
    
    //Render
    return (
        <ScreenContainer
            section = { type === 'PRIMARY' 
                ? 'Mi actividad'
                : ''
            }
        >
            { children }
        </ScreenContainer>
    )
}