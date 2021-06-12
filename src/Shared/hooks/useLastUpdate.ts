import { useState, useEffect, useCallback } from 'react';
//Helpers
import DateHelper from '../utils/Date/DateHelper';
//Constants
const DEFAULT_UPDATE_INTERVAL = 10_000;

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Custom hook to get the last update label that updates itself every updateInterval millisenconds.
 */
const useLastUpdate = (
    issuedAt: string, 
    updateInterval: number = DEFAULT_UPDATE_INTERVAL
) => {
    /**
     * Hooks
     */
    //State
    const [lastUpdate, setLastUpdate] = useState<string | null>(null);

    //Callbacks
    const updateDateDifference = useCallback(() => {
        setLastUpdate(
            DateHelper
                .getDateDifferenceFromIsoString(issuedAt)
        );
    }, [
        issuedAt,
        setLastUpdate
    ]);

    //Effects
    useEffect(() => {
        updateDateDifference();
        //We set the update interval
        const interval = setInterval(
            updateDateDifference, 
            updateInterval
        );
        //Cleanup
        return () => clearInterval(interval);
    }, [
        updateInterval,
        updateDateDifference
    ]);

    return lastUpdate;
}

export default useLastUpdate;