import { useEffect } from 'react'
//Domain
import { ChatPrimitives } from '../../../../Chat/domain/Chat';
//Hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getChatsAction } from '../../reducers/chatDuck';

/**
 * Custom hook to get the chats user belongs to in the application.
 */
const useChats = () => {
    /**
     * Hooks
     */
    //Redux store
    const { chats, fetching } = useAppSelector(state => state.chat);
    //Actions dispatcher
    const dispatch = useAppDispatch();

    //Effects
    useEffect(() => {
        dispatch(getChatsAction());
    }, [dispatch]);

    return { 
        chats: chats as ChatPrimitives[], 
        fetching,
        getChats: () => dispatch(getChatsAction()),
    };
}

export default useChats;