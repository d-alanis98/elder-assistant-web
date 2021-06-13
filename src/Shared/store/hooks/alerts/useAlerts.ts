import { useCallback } from 'react';
//Custom callback
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { createAlertAction, CreateAlert } from '../../reducers/alertsDuck';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Custom hooks for the system alerts.
 */
const useAlerts = () => {
    /**
     * Hooks
     */
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Store selector
    const { 
        type, 
        display,
        message 
    } = useAppSelector(state => state.alerts);

    //Callbacks
    const createNotification = useCallback(({
        type,
        message,
        duration
    }: CreateAlert) => {
        dispatch(createAlertAction({ 
            type, 
            message, 
            duration 
        }));
    }, [dispatch]);

    return {
        type,
        display,
        message,
        createNotification
    }
}

export default useAlerts;