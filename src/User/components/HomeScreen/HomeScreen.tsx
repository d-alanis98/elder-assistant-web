import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
import PrimaryUserScreen from './PrimaryUser/PrimaryUserScreen';
import PrimaryUserProtected from '../../../Shared/components/Screens/PrimaryUserProtected';


const HomeScreen: React.FC = () => {
    /**
     * Hooks
     */

    return (
        <ScreenContainer>
            <PrimaryUserProtected>
                <PrimaryUserScreen />
            </PrimaryUserProtected>
        </ScreenContainer>
    );
}

export default HomeScreen;