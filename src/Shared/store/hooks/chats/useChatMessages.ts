import { useEffect, useCallback } from 'react';
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getChatMessagesAction, getChatUserDataAction } from '../../reducers/chatDuck';

const useChatMessages = (chatId: string) => {
    /**
     * Hooks
     */
    //State selector
    const { messages, fetchingMessages } = useAppSelector(state => state.chat);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        if(!chatId)
            return;
        //We get the chat messages at mount
        dispatch(
            getChatMessagesAction(chatId)
        );
    }, [
        chatId,
        dispatch
    ]);

    //Callbacks
    const getChatMessages = useCallback((startingAt?: string) => {
        dispatch(getChatMessagesAction(chatId, startingAt));
    }, [
        chatId,
        dispatch
    ]);

    const getChatUserData = useCallback((userId: string) => (
        dispatch(getChatUserDataAction(chatId, userId))
    ), [
        chatId,
        dispatch
    ])

    return {
        messages: messages[chatId] ? messages[chatId].messages : [],
        fetching: fetchingMessages,
        getChatMessages,
        getChatUserData,
    };
};

export default useChatMessages;