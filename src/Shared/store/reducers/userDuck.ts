import { AnyAction } from 'redux';
//Domain
import { UserData, UserPrimitives, ValidUserTypes } from '../../../User/domain/User';
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
//API
import { getUserByID, getUsersByName } from '../../../User/infrastructure/api/usersApi';

/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Specification of the users reducer, containing action types, the
 * reducer itself and the action functions.
 */

/**
 * Constants
 */

//Action types
const LOGIN                 = 'LOGIN';
const LOGOUT                = 'LOGOUT';
const GET_USERS             = 'GET_USERS';
const LOGIN_ERROR           = 'LOGIN_ERROR';
const LOGIN_SUCCESS         = 'LOGIN_SUCCESS';
const GET_USERS_ERROR       = 'GET_USERS_ERROR';
const GET_USERS_SUCCESS     = 'GET_USERS_SUCCESS';
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
    users: UserPrimitives[];
    token: string;
    loading: boolean;
    loggedIn: boolean;
    lastName: string;
    nextUsers?: string | null;
    dateOfBirth: string;
    currentScreen: string;
    usersDictionary: UsersDictionary;
};

const initialState: UserState = {
    _id: '',
    name: '',
    type: ValidUserTypes.SECONDARY,
    email: '',
    users: [],
    token: '',
    loading: false,
    loggedIn: false,
    lastName: '',
    nextUsers: undefined,
    dateOfBirth: '',
    refreshToken: '',
    currentScreen: '',
    usersDictionary: { },
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): UserState => {
    const { type, payload } = action;

    switch(type) {
        case LOGIN:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT:
            return initialState;
        case GET_USERS:
            return {
                ...state,
                loading: true,
            };
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
        case GET_USERS_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
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
 * Action to get the users by name.
 * @param {string} name User name.
 * @returns 
 */
export const getUsersByNameAction = (
    name: string
): ThunkAppAction => async (dispatch, getState) => {
    //We dispath the loading action
    dispatch({
        type: GET_USERS
    });
    try {
        //We get the starting point from state
        const startingAt = getState().user.nextUsers || '';
        //We request the users via the API method
        const paginatedUsers = await getUsersByName({ name, startingAt });
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                users: paginatedUsers.data,
                nextUsers: paginatedUsers.next,
                usersDictionary: getUpdatedUsersDictionary(
                    paginatedUsers.data,
                    getState().user.usersDictionary
                )
            }
        });
    } catch(error) {
        dispatch({
            type: GET_USERS_ERROR,
            payloaD: error.message
        });
    }
}

/**
 * Action to get the user data by ID, it performs a search in the users dictionary, if no entry is found the data is requested
 * to the API and then saved to the dictionary for future queries.
 * @param {string} userId User ID.
 * @returns 
 */
export const getUserByIdAction = (userId: string): ThunkAppAction<Promise<UserPrimitives>> => async (dispatch, getState) => {
    //First, we verify if the user does not exists in the dictionary
    const { usersDictionary } = getState().user;
    const foundUser = usersDictionary[userId];
    if(foundUser)
        return foundUser;
    //If the user is not found in the existing dictionary, we request the user to the API
    try {
        const userData = await getUserByID(userId);
        //We update the users dictionary
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                usersDictionary: getUpdatedUsersDictionary(
                    [ userData ],
                    getState().user.usersDictionary
                )  
            }
        });
        //We return the value
        return userData;
    } catch(error) {
        return Promise.reject(error.message);
    }
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

/**
 * Function to add a collection of users to the users dictionary. Getting this updated dictionary.
 * @param {UserPrimitives[]} usersToAdd Users to add to the dictionary.
 * @param {UsersDictionary} previousUsersDictionary Existing users dictionary.
 * @returns {UsersDictionary}
 */
const getUpdatedUsersDictionary = (
    usersToAdd: UserPrimitives[],
    previousUsersDictionary: UsersDictionary
) => ({
    ...previousUsersDictionary,
    ...usersToAdd.reduce((accumulated, current) => ({
        ...accumulated,
        [current._id]: current
    }), {})
});

//Types
interface UsersDictionary {
    [userId: string]: UserPrimitives;
}