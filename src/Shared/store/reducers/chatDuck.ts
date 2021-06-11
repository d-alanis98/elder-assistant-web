import { AnyAction } from 'redux';
import { RootState, ThunkAppAction } from '../store';
//Domain
import { ChatPrimitives } from '../../../Chat/domain/Chat';
import { ChatMessagePrimitives } from '../../../ChatMessage/domain/ChatMessage';
//User domain
import { UserPrimitives } from '../../../User/domain/User';
//Shared domain
import { Nullable } from '../../domain/Nullable';
//API
import { getChats } from '../../../Chat/infrastructure/api/chatApi';
import { getChatMessages, PaginatedChatMessages } from '../../../ChatMessage/infrastructure/api/chatMessagesApi';


/**
 * @author Damian Alanis Ramirez
 * @version 2.2.1
 * @description Chat duck.
 */

/**
 * Constants
 */
//Actions
const GET_CHATS                 = 'GET_CHATS';
const GET_CHATS_ERROR           = 'GET_CHATS_ERROR';
const GET_CHATS_SUCCESS         = 'GET_CHATS_SUCCESS';
const GET_CHAT_MESSAGES         = 'GET_CHAT_MESSAGES';
const GET_CHAT_MESSAGES_ERROR   = 'GET_CHAT_MESSAGES_ERROR';
const GET_CHAT_MESSAGES_SUCCESS = 'GET_CHAT_MESSAGES_SUCCESS';
//State structure
interface ChatState {
    error?: string;
    chats: ChatPrimitives[];
    messages: ChatMessagesDictionary;
    fetching:  boolean;
    fetchingMessages: boolean;
    chatUsersDictionary: ChatUsersDictionary;
}
//Initial state
const initialState: ChatState = {
    chats: [],
    messages: {},
    fetching: false,
    fetchingMessages: false,
    chatUsersDictionary: {}
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
                ...payload,
                error: undefined,
                fetching: false,
            };
        case GET_CHAT_MESSAGES:
            return {
                ...state,
                fetchingMessages: true,
            };
        case GET_CHAT_MESSAGES_ERROR:
            return {
                ...state,
                error: payload,
                fetchingMessages: false
            };
        case GET_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: payload,
                fetchingMessages: false
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
            payload: {
                chats,
                chatUsersDictionary: getChatUsersDictionary(chats)
            }
        });
    } catch(error) {
        dispatch({
            type: GET_CHATS_ERROR,
            payload: error.message
        });
    }
}

/**
 * Action to get the messages of a chat, with pagination support (startingAt parameter).
 * @param {string} chatId Id of the chat whose messages we want to get.
 * @param {string | undefined} startingAt Starting point, for pagination purposes.
 * @returns 
 */
export let getChatMessagesAction = (chat: ChatPrimitives, startingAt?: string): ThunkAppAction => async (dispatch, getState) => {
    dispatch({
        type: GET_CHAT_MESSAGES,
    });
    try {
        const chatMessagesRecords = await getChatMessages({ chat, startingAt });
        //We get the updated messages dictionary
        const updatedDictionary = getMessagesDictionary(chat._id, chatMessagesRecords, getState());
        //We dispatch the updated dictionary
        dispatch({
            type: GET_CHAT_MESSAGES_SUCCESS,
            payload: updatedDictionary
        });
    } catch(error) {
        dispatch({
            type: GET_CHAT_MESSAGES_ERROR,
            payload: error.message
        });
    }
} 

/**
 * Action to get the chat user data from the chat users dictionary in constant time.
 * Instead of performing a linear search through the members array, which can 
 * lead to O(n) time complexity.
 * @param chatId Id of the chat the user belongs to.
 * @param userId Id of the user whose data we want to retrieve.
 * @returns 
 */
export let getChatUserDataAction = (chatId: string, userId: string): 
    ThunkAppAction<Nullable<UserPrimitives>> => (_, getState) => {
    //We get the chat users dictionary from state
    const { chat: { chatUsersDictionary } } = { ...getState() };
    //We return the chat user data
    return chatUsersDictionary[chatId]?.[userId];
} 

/**
 * Helpers
 */
//Functions

/**
 * Method to get the chat users dictionary, with the received chats data.
 * @param {ChatPrimitives[]} receivedChats Received chats data.
 * @returns 
 */
const getChatUsersDictionary = (
    receivedChats: ChatPrimitives[]
): ChatUsersDictionary => (
    receivedChats
    .reduce<ChatUsersDictionary>((receivedAccumulated, currentChat) => ({
        ...receivedAccumulated,
        [currentChat._id]: currentChat.members
            .reduce<ChatUsersDictionaryEntry>((accumulated, currentValue) => ({
                ...accumulated,
                [currentValue._id]: currentValue
            }), {})
    }), {})
);
/**
 * Method to get the messages dictionary, with the received messages and
 * the nextData starting point.
 * @param {string} chatId ID of the chat whose messages we obtained.
 * @param {PaginatedChatMessages} receivedData Received paginated data.
 * @param {RootState} existingState Existing data in state.
 * @returns 
 */
const getMessagesDictionary = (
    chatId: string, 
    receivedData: PaginatedChatMessages, 
    existingState: RootState
) => {
    //We extract the existing messages dictionary
    const { chat: { messages } } = { ...existingState };
    //We get the current entry
    const updatedEntry = messages[chatId]
        ? updateExistingEntry(messages[chatId], receivedData)
        : getInitialEntry(receivedData);
    //We set the updated dictionary
    const updatedDictionary: ChatMessagesDictionary = {
        ...messages,
        [chatId]: updatedEntry
    };
    return updatedDictionary;
}

/**
 * Method to get the initial data for an unexisting entry in the dictionary.
 * @param {PaginatedChatMessages} receivedData Received paginated data.
 * @returns 
 */
const getInitialEntry = (receivedData: PaginatedChatMessages): ChatMessagesDictionaryEntry => ({
    messages: receivedData.data,
    nextData: receivedData.next
});

/**
 * Method to updated n existing dictionary entry (concatenating the new messages
 * and setting the new nextData starting point).
 * @param {ChatMessagesDictionaryEntry} entry Existing entry to update.
 * @param {PaginatedChatMessages} receivedData Received paginated data.
 * @returns 
 */
const updateExistingEntry = (
    entry: ChatMessagesDictionaryEntry,
    receivedData: PaginatedChatMessages 
): ChatMessagesDictionaryEntry => ({
    messages: getUpdatedMessagesArray(
        entry.messages,
        receivedData.data
    ),
    nextData: receivedData.next
});

/**
 * Method to get the updated messages array, considering the existing messages in state, 
 * and adding new messages only if they're not present already.
 * @param {ChatMessagePrimitives[]} existingMessages Existing messages array.
 * @param {ChatMessagePrimitives[]} receivedMessages Received messages array.
 * @returns 
 */
const getUpdatedMessagesArray = (
    existingMessages: ChatMessagePrimitives[],
    receivedMessages: ChatMessagePrimitives[]
): ChatMessagePrimitives[] => {
    const receivedMessagesQuantity = receivedMessages.length;
    if(receivedMessagesQuantity === 0)
        return existingMessages;
    //We get the first and last message
    const [firstMessage] = receivedMessages;
    const lastMessage = receivedMessages[receivedMessagesQuantity - 1];
    //We verify that none of them are present in the existing messages
    const foundFirstMessage = existingMessages.find(message => message._id === firstMessage._id);
    const foundLastMessage = existingMessages.find(message => message._id === lastMessage._id);
    //If none of the messages were found, we can concat the received messages to the existing ones
    if(!foundFirstMessage && !foundLastMessage)
        return existingMessages.concat(receivedMessages).sort((a, b) => new Date(a.issuedAt).getTime() - new Date(b.issuedAt).getTime());
    //If both messages are present, we don't update anything, because they're already present
    if(foundFirstMessage !== undefined && foundLastMessage !== undefined)
        return existingMessages;
    //Otherwise, we perform the verification message by message
    const unexistingMessages = receivedMessages.filter(receivedMessage => {
        const foundMessage = existingMessages.find(existingMessage => existingMessage._id === receivedMessage._id);
        return foundMessage === undefined;
    });
    return existingMessages.concat(unexistingMessages).sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());
}

//Types
type ChatMessagesDictionary = {
    [chatId: string]: ChatMessagesDictionaryEntry
};

type ChatMessagesDictionaryEntry = {
    messages: ChatMessagePrimitives[],
    nextData: string | null
};

type ChatUsersDictionary = {
    [chatId: string]: ChatUsersDictionaryEntry,
};

type ChatUsersDictionaryEntry = {
    [userId: string]: UserPrimitives,
};