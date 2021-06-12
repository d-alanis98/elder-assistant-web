import React from 'react';
//Domain
import { ValidUserTypes } from '../../../User/domain/User';
//Components
import NotFound from '../Miscelaneous/NotFound/NotFound';
//Hooks
import { useAppSelector } from '../../store/hooks';

interface SecondaryUserProtectedProps {
    showFallback?: boolean;
}

const SecondaryUserProtected: React.FC<SecondaryUserProtectedProps> = ({ 
    children,
    showFallback 
}) => {
    /**
     * Hooks
     */
    //Redux state
    const { type: userType = 'SECONDARY' } = useAppSelector(state => state?.user);

    return userType === ValidUserTypes.SECONDARY
    ? <>{ children }</>
    : showFallback
        ? <NotFound />
        : null;
}

export default SecondaryUserProtected;