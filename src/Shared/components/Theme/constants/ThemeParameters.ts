
/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Theme parameters specification and default values.
 */
export interface ThemeParameters {
    //Main UI colors
    fontColor: string;
    backgroundColor: string;
    //Emphasis
    alertColor: string;
    successColor: string;
    primaryColor: string;
    warningColor: string;
    secondaryColor: string;
    informationColor: string;
    secondaryFontColor: string;
}

export const defaultThemeParameters: ThemeParameters = {
    fontColor: '#333',
    backgroundColor: '#ffffff',
    alertColor: '#d9534f',
    successColor: '#5cb85c',
    primaryColor: '#0275d8',
    warningColor: '#f0ad4e',
    secondaryColor: '#f8f9fa',
    informationColor: '#5bc0de',
    secondaryFontColor: '#aaaaaa',
};

export enum ValidThemes {
    DARK_THEME = 'DARK_THEME',
    LIGHT_THEME = 'LIGHT_THEME',
}
