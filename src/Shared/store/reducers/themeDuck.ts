import { AnyAction } from 'redux'
//Properties
import { themeToApply } from '../../components/Theme/constants/theme';
import { ValidThemes, ThemeParameters, defaultThemeParameters } from '../../components/Theme/constants/ThemeParameters';
//Base action type
import { ThunkAppAction } from '../store';

/**
 * Constants
 */

//Action types
const SET_THEME = 'SET_THEME';
//Initial state contract
interface ThemeState {
    type: ValidThemes;
    theme: ThemeParameters;
}
//Initial state
const initialState: ThemeState = {
    type:  ValidThemes.LIGHT_THEME,
    theme: defaultThemeParameters
}
//Others
const CURRENT_THEME_KEY = 'CURRENT_THEME_KEY';

/**
 * Reducer
 */
const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;
    switch(type) {
        case SET_THEME:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}

export default reducer;

/**
 * Actions
 */

/**
 * Method to set the theme to apply at state level.
 * @param {ValidThemes} themeType Theme to be applied.
 * @returns 
 */
export let setThemeAction = (themeType: ValidThemes): ThunkAppAction => dispatch => {
    dispatch({
        type: SET_THEME,
        payload: {
            type: themeType,
            theme: themeToApply(themeType)
        }
    });
} 

/**
 * Action to toggle the current theme.
 * @returns New state
 */
export let toggleThemeAction = (): ThunkAppAction => (dispatch, getState) => {
    const { theme: { type } } = getState();
    //We toggle the theme type
    const themeType = type === ValidThemes.LIGHT_THEME 
    ? ValidThemes.DARK_THEME 
    : ValidThemes.LIGHT_THEME;

    //We persist the theme preferences
    setThemeInLocalStorage(themeType);
    //We dispatch the set theme action
    setThemeAction(themeType)(dispatch, getState, null);
}

/**
 * Action to restore the theme from the local storage.
 * @returns 
 */
export let restoreThemeAction = (): ThunkAppAction => (dispatch, getState) => {
    const appliedTheme = getThemeFromLocalStorage();
    //We validate the applied theme existance
    if(!appliedTheme)
        return;
    //We set the theme to restore the user preferences
    setThemeAction(appliedTheme as ValidThemes)(dispatch, getState, null);
}

/**
 * Helpers
 */
/**
 * Helper function to persist the applied theme in the local storage.
 * @param {ValidThemes} themeToApply Theme to persist.
 */
const setThemeInLocalStorage = (themeToApply: ValidThemes) => {
    localStorage.setItem(CURRENT_THEME_KEY, themeToApply.toString());
}

/**
 * Helper function to persisted applied theme data from the local storage.
 * @returns {ValidThemes} Persisted theme data.
 */
const getThemeFromLocalStorage = () => (
    localStorage.getItem(CURRENT_THEME_KEY)
);