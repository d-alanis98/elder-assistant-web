import { useEffect, useCallback } from 'react';
//Domain
import { ChatPrimitives } from '../../../../Chat/domain/Chat';
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getChatMessagesAction, getChatUserDataAction } from '../../reducers/chatDuck';

const useChatMessages = (chat: ChatPrimitives) => {
    /**
     * Hooks
     */
    //State selector
    const { messages, fetchingMessages } = useAppSelector(state => state.chat);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        if(!chat || !chat._id)
            return;
        //We get the chat messages at mount
        dispatch(
            getChatMessagesAction(chat)
        );
    }, [
        chat,
        dispatch
    ]);

    //Callbacks
    const getChatMessages = useCallback((startingAt?: string) => {
        dispatch(getChatMessagesAction(chat, startingAt));
    }, [
        chat,
        dispatch
    ]);

    const getChatUserData = useCallback((userId: string) => (
        dispatch(getChatUserDataAction(chat._id, userId))
    ), [
        chat,
        dispatch
    ])

    return {
        messages: messages[chat._id] ? messages[chat._id].messages : [],
        fetching: fetchingMessages,
        getChatMessages,
        getChatUserData,
    };
};

export default useChatMessages;