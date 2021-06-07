import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
//Custom hooks
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
//Actions
import { setCurrentScreenAction } from '../../../store/reducers/userDuck';

const useCurrentScreen = () => {
    /**
     * Hooks
     */
    //Store state
    const dispatch = useAppDispatch();
    const { currentScreen } = useAppSelector(state => state.user);
    //History state
    const { location } = useHistory();

    const setCurrentScreen = useCallback((screen: string) => {
        dispatch(setCurrentScreenAction(screen))
    }, [
        dispatch
    ]);

    //Effects
    useEffect(() => {
        setCurrentScreen(location.pathname);
    }, [
        location,
        setCurrentScreen
    ]);

    return {
        currentScreen,
        setCurrentScreen
    };
}

export default useCurrentScreen;