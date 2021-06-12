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
    /**
     * Hooks
     */
    //Global state selector
    const { type: currentTheme } = useAppSelector(state => state.theme);
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Callbacks
    /**
     * Function to get the icon based on the current theme.
     */
    const getCurrentThemeIcon = useCallback(() => {
        if(currentTheme === ValidThemes.DARK_THEME)
            return faMoon;
        return faSun;
    }, [currentTheme]);

    /**
     * Function to set the theme at global state level.
     */
    const setTheme = useCallback((theme: string) => {
        dispatch(setThemeAction(theme as ValidThemes));
    }, [dispatch]);

    /**
     * Function to determine if a theme option is the current one.
     */
    const isSelected = useCallback((theme: ValidThemes) => (
        currentTheme === theme
    ), [currentTheme]);

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
                    checked = { isSelected(ValidThemes.LIGHT_THEME) }
                    setTheme = { setTheme }
                />
                <ThemeOption 
                    value = { ValidThemes.DARK_THEME }
                    theme = 'Obscuro'
                    checked = { isSelected(ValidThemes.DARK_THEME) }
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
    checked: boolean;
    setTheme: (theme: string) => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
    value,
    theme,
    checked,
    setTheme
}) => (
    <div>
        <RadioButtonSetting 
            name = 'theme'
            value = { value }
            checked = { checked }
            onChange = { event => setTheme(event.target.value) }
        />
        <SettingLabel>{ theme }</SettingLabel>
    </div>
)

