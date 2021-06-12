import { useCallback } from 'react';
//Custom hooks
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { getUsersByNameAction } from '../../reducers/userDuck';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Custom hook for the user's search functionality.
 */
const useUsersSearch = () => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Store selector
    const { users, loading } = useAppSelector(state => state.user);
    //Callbacks
    const getUsersByName = useCallback((name: string) => {
        dispatch(getUsersByNameAction(name));
    }, [dispatch])

    return {
        users,
        fetching: loading,
        getUsersByName
    }
}

export default useUsersSearch;