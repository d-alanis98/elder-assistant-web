import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '..';
//Actions
import { setPanicAlertAsAttendedAction } from '../../reducers/deviceDataDuck';

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description Custom Hook for the panic alerts component.
 */
const usePanicAlerts = () => {
    /**
     * Hooks
     */
    //Store hooks
    const dispatch = useAppDispatch();
    const { attendedPanicAlerts } = useAppSelector(state => state.deviceData);
    
    //Callbacks
    const isAlertAttended = useCallback((alertId: string) => (
        attendedPanicAlerts[alertId]
    ), [attendedPanicAlerts]);

    const setPanicAlertAsAttended = useCallback((alertId: string) => {
        dispatch(setPanicAlertAsAttendedAction(alertId))
    }, [dispatch]);

    return {
        isAlertAttended,
        setPanicAlertAsAttended
    };
}

export default usePanicAlerts;