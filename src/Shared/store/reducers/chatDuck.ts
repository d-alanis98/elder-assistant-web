import { AnyAction } from 'redux';
//Domain
import { ChatPrimitives } from '../../../Chat/domain/Chat';
import { getChats } from '../../../Chat/infrastructure/api/chatApi';
import { ChatMessagePrimitives } from '../../../ChatMessage/domain/ChatMessage';
import { ThunkAppAction } from '../store';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Chat duck.
 */

/**
 * Constants
 */
//Actions
const GET_CHATS         = 'GET_CHATS';
const GET_CHATS_ERROR   = 'GET_CHATS_ERROR';
const GET_CHATS_SUCCESS = 'GET_CHATS_SUCCESS';
//State structure
interface ChatState {
    error?: string;
    chats: ChatPrimitives[];
    messages: ChatMessagesDictionary;
    fetching:  boolean;
}
//Initial state
const initialState: ChatState = {
    chats: [],
    messages: {},
    fetching: false,
};

/**
 * Reducer
 */

const reducer = (state = initialState, action: AnyAction): ChatState => {
    const { type, payload } = action;
    switch(type) {
        case GET_CHATS:
            return {
                ...state,
                fetching: true,
            };
        case GET_CHATS_ERROR:
            return {
                ...state,
                error: payload,
                fetching: false,
            };
        case GET_CHATS_SUCCESS:
            return {
                ...state,
                chats: payload,
                error: undefined,
                fetching: false,
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
 * Action to fetch all the chats a user belongs to from the API.
 * @returns 
 */
export let getChatsAction = (): ThunkAppAction => async (dispatch, getState) => {
    //We enable the loading state
    dispatch({
        type: GET_CHATS,
    });
    try {
        const chats = await getChats();
        dispatch({
            type: GET_CHATS_SUCCESS,
            payload: chats
        });
    } catch(error) {
        dispatch({
            type: GET_CHATS_ERROR,
            payload: error.message
        });
    }
}

/**
 * Helpers
 */
//Types
type ChatMessagesDictionary = {
    [chatId: string]: ChatMessagePrimitives[],
}