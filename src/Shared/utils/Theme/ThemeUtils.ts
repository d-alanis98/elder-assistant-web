//Theme
import { isDarkTheme } from '../../components/Theme/constants/theme';
import { ThemeParameters } from '../../components/Theme/constants/ThemeParameters';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Theme utils class.
 */
export default class ThemeUtils {
    //Constants
    static DEFAULT_OPACITY = 0.05;
    /**
     * Method to get the value for a property based on the theme.
     * @param {ThemeParameters} theme The current theme.
     * @param {any} lightThemeValue Value for light theme.
     * @param {any} darkThemeValue Value for dark theme.
     * @returns 
     */
    static getValueBasedOnTheme = (
        theme: ThemeParameters, 
        lightThemeValue: any, 
        darkThemeValue: any
    ) => isDarkTheme(theme)
        ? darkThemeValue
        : lightThemeValue;
    
    /**
     * Method to get a translucid background color based on the theme.
     * @param {ThemeParameters} theme The current theme
     * @returns 
     */
    static getThemedTranslucidBackground = (theme: ThemeParameters, opacity?: number) => (
        ThemeUtils.getValueBasedOnTheme(
            theme,
            `rgba(0,0,0,${ opacity || ThemeUtils.DEFAULT_OPACITY })`,
            `rgba(255,255,255,${ opacity || ThemeUtils.DEFAULT_OPACITY })`
        )
    );
    
}