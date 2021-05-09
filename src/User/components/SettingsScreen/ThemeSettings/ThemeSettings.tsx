import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback } from 'react';
//Components
import Label from '../../../../Shared/components/Layout/Labels/Label';
import LabelWithIcon from '../../../../Shared/components/Layout/Labels/LabelWithIcon/LabelWithIcon';
//Theme
import { ValidThemes } from '../../../../Shared/components/Theme/constants/ThemeParameters';
//Hooks
import { useAppDispatch, useAppSelector } from '../../../../Shared/store/hooks';
//Actions
import { toggleThemeAction } from '../../../../Shared/store/reducers/themeDuck';

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

    return (
        <>
            <LabelWithIcon
                icon = { getCurrentThemeIcon() }
            >
                Tema
            </LabelWithIcon>
            <div
                style = {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}
            >
                <div onClick = {() => dispatch(toggleThemeAction()) }>
                    <Label fontSize={17}>Cambiar</Label>
                </div>
            </div>
        </>
    );
}

export default ThemeSettings;


