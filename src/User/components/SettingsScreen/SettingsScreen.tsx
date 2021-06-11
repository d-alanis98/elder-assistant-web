import React from 'react';
//Components
import ThemeSettings from './Settings/ThemeSettings/ThemeSettings';
import AccountSettings from './Settings/AccountSettings/AccountSettings';
import ScreenContainer from '../../../Shared/components/Screens/ScreenContainer/ScreenContainer';
//Styled components
import { SettingsScreenContainer } from './SettingsScreen.styles';


const SettingsScreen: React.FC = () => (
    <ScreenContainer
        section = 'Ajustes'
    >
        <SettingsScreenContainer>
            <ThemeSettings />
            <AccountSettings />
        </SettingsScreenContainer>
    </ScreenContainer>
);

export default SettingsScreen;