import { AnyAction } from 'redux';
//Domain
import { UserData, ValidUserTypes } from '../../../User/domain/User';
//Domain exceptions
import SessionNotFound from '../../../UserAuthentication/domain/exceptions/SessionNotFound';
//Infrastructure
import { login } from '../../../UserAuthentication/infrastructure/userAuthenticationApi';
//Thunk action base type
import { ThunkAppAction } from '../store';
//External actions
import { hideModalAction } from './modalDuck';
import { setThemeAction } from './themeDuck';
//Constants
import { ValidThemes } from '../../components/Theme/constants/ThemeParameters';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Specification of the users reducer, containing action types, the
 * reducer itself and the action functions.
 */

/**
 * Constants
 */

//Action types
const LOGIN                 = 'LOGIN';
const LOGOUT                = 'LOGOUT';
const LOGIN_ERROR           = 'LOGIN_ERROR';
const LOGIN_SUCCESS         = 'LOGIN_SUCCESS';
const SET_CURRENT_SCREEN    = 'SET_CURRENT_SCREEN';
const REFRESH_TOKEN_ERROR   = 'REFRESH_TOKEN_ERROR';
const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
//Other constants
const USER_KEY          = 'USER';
const TOKEN_KEY         = 'TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
//Initial state
interface UserState extends UserData {
    _id: string;
    name: string;
    type: ValidUserTypes;
    error?: string;
    email: string;
    token: string;
    loading: boolean;
    loggedIn: boolean;
    lastName: string;
    dateOfBirth: string;
    currentScreen: string;
};

const initialState: UserState = {
    _id: '',
    name: '',
    type: ValidUserTypes.SECONDARY,
    email: '',
    token: '',
    loading: false,
    loggedIn: false,
    lastName: '',
    dateOfBirth: '',
    refreshToken: '',
    currentScreen: ''
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction) => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT:
            return initialState;
        case LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case LOGIN_SUCCESS:
            const userData: UserData = payload;
            return {
                ...state,
                ...userData,
                loading: false,
                loggedIn: true,
            };
        case SET_CURRENT_SCREEN:
            return {
                ...state,
                currentScreen: payload
            };
        case REFRESH_TOKEN_ERROR:
            return {
                ...state,
                error: payload,
                token: '',
                loggedIn: false,
            };
        case REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: payload,
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
 * Action to make the HTTP request to the login endpoint and handle the response, either dispatching the LOGIN_SUCCESS action
 * or the LOGIN_ERROR. It also saves the session data in the local storage.
 * @param {FormData|Object} data The credentials object or form data.
 * @returns 
 */
export const loginAction = (data: FormData | Object): ThunkAppAction<Promise<void>> => async dispatch => {
    try {
        const { user, token, refreshToken } = await login(data);
        //We save the tokens in the storage
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        //We dispatch the login success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...user,
                token,
                refreshToken
            }
        });
        
    } catch(error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        });
    }
}

/**
 * Action to handle the session restoring, firstly looking for the session data in the storage and dispatching the 
 * LOGIN_SUCCESS action if it succeeds, otherwise it dispatchs the LOGIN_ERROR action with a custom exception SessionNotFound.
 * @returns 
 */
export const restoreSessionAction = (): ThunkAppAction => async dispatch => {
    try {
        //We get the data from the local storage
        const user = localStorage.getItem(USER_KEY);
        const token = localStorage.getItem(TOKEN_KEY);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        //We validate the data existance
        if(!user || !token || !refreshToken)
            throw new SessionNotFound();
        //We parse the user data
        const parsedUser = JSON.parse(user);
        //We dispatch the success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                ...parsedUser,
                token,
                refreshToken
            }
        });
    } catch(error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.message,
        })
    };
}

/**
 * Action to update the authorization token in both the state and the storage.
 * @param {string} newToken The new authorization token.
 * @returns 
 */
export const updateAuthTokenAction = (newToken: string): ThunkAppAction => async dispatch => {
    try {
        localStorage.setItem(TOKEN_KEY, newToken);
        //We dispatch the action with the new token as payload
        dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            payload: newToken,
        });
    } catch(error) {
        dispatch({
            type: REFRESH_TOKEN_ERROR,
            payload: error.message,
        });
        //Set session expired action
    }
}

/**
 * Action to logout the user, clears the state and the storage.
 * @returns 
 */
export const logoutAction = (): ThunkAppAction => (dispatch, getState) => {
    dispatch({
        type: LOGOUT,
    });
    clearStorage();
    //We return to the defaults
    hideModalAction()(dispatch, getState, undefined);
    setThemeAction(ValidThemes.LIGHT_THEME)(dispatch, getState, undefined);
    //Create notification (logout)
}

/**
 * Action to logout the user with a session expired message.
 * @returns 
 */
export const sessionExpiredAction = (): ThunkAppAction => (dispatch, getState) => {
    logoutAction()(dispatch, getState, null);
    //Create notification actio (session expired)
} 

/**
 * Action to set the current screen.
 * @param {string} currentScreen Current screen.
 * @returns 
 */
export const setCurrentScreenAction = (
    currentScreen: string
): ThunkAppAction => (dispatch, _) => {
    dispatch({
        type: SET_CURRENT_SCREEN,
        payload: currentScreen
    });
}

/**
 * Helpers
 */

/**
 * Function to clear the items in the storage corresponding to the user session.
 */
const clearStorage = async () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}