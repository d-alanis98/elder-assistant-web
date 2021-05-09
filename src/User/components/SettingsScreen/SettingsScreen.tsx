import React from 'react';
//Components
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
//Styled components
import { SettingsScreenContainer } from './SettingsScreen.styles';
import ThemeSettings from './ThemeSettings/ThemeSettings';


const SettingsScreen: React.FC = () => (
    <ScreenContainer
        section = 'Ajustes'
    >
        <SettingsScreenContainer>
            <ThemeSettings />
        </SettingsScreenContainer>
    </ScreenContainer>
);

export default SettingsScreen;