import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import PrimaryUserScreen from './PrimaryUser/PrimaryUserScreen';
import SecondaryUserScreen from './SecondaryUser/SecondaryUserScreen';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';
import SecondaryUserProtected from '../../../Shared/components/Screens/SecondaryUserProtected';

const HomeScreen: React.FC = () => {
    /**
     * Hooks
     */

    return (
        <ScreenContainer>
            <PrimaryUserProtected>
                <PrimaryUserScreen />
            </PrimaryUserProtected>
            <SecondaryUserProtected>
                <SecondaryUserScreen />
            </SecondaryUserProtected>
        </ScreenContainer>
    );
}

export default HomeScreen;