import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getUserByIdAction, getUsersByNameAction } from '../../reducers/userDuck';

/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 * @description Custom hook for the user's search functionality.
 */
const useUsersSearch = () => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Store selector
    const { 
        _id: userId, 
        users, 
        loading,
        usersDictionary 
    } = useAppSelector(state => state.user);
    //Callbacks
    const getUsersByName = useCallback((name: string) => {
        dispatch(getUsersByNameAction(name));
    }, [dispatch]);

    const getUserById = useCallback(async (userId: string) => (
        dispatch(getUserByIdAction(userId))
    ), [dispatch]);

    return {
        users,
        userId,
        fetching: loading,
        getUserById,
        getUsersByName,
        usersDictionary
    }
}

export default useUsersSearch;