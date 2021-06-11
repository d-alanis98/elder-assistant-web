import React, { useCallback } from 'react';
//Styled Components
import { RadioButtonSetting, SettingContainer, SettingLabel, SettingModifierContainer, SettingTitle } from '../Settings.styles';
//Theme
import { ValidThemes } from '../../../../../Shared/components/Theme/constants/ThemeParameters';
//Hooks
import { useAppDispatch, useAppSelector } from '../../../../../Shared/store/hooks';
//Actions
import { setThemeAction } from '../../../../../Shared/store/reducers/themeDuck';
//Icons
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeSettings: React.FC = () => {
    const { type: currentTheme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();
    /**
     * Function to get the current theme icon.
     */
    const getCurrentThemeIcon = useCallback(() => {
        if(currentTheme === ValidThemes.DARK_THEME)
            return faMoon;
        return faSun;
    }, [currentTheme]);

    const setTheme = useCallback((theme: string) => {
        dispatch(setThemeAction(theme as ValidThemes));
    }, [dispatch]);

    return (
        <SettingContainer>
            <SettingTitle
                icon = { getCurrentThemeIcon() }
            >
                Tema
            </SettingTitle>
            <SettingModifierContainer>
                <ThemeOption 
                    value = { ValidThemes.LIGHT_THEME }
                    theme = 'Claro'
                    setTheme = { setTheme }
                />
                <ThemeOption 
                    value = { ValidThemes.DARK_THEME }
                    theme = 'Obscuro'
                    setTheme = { setTheme }
                />
            </SettingModifierContainer>
        </SettingContainer>
    );
}

export default ThemeSettings;


//Internal components

interface ThemeOptionProps {
    value: ValidThemes;
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
    value,
    theme,
    setTheme
}) => (
    <div>
        <RadioButtonSetting 
            name = 'theme'
            value = { value }
            onChange = { event => setTheme(event.target.value) }
        />
        <SettingLabel>{ theme }</SettingLabel>
    </div>
)

