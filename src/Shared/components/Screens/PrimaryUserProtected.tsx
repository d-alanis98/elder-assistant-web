import React from 'react';
//Domain
import { ValidUserTypes } from '../../../User/domain/User';
//Components
import NotFound from '../Miscelaneous/NotFound/NotFound';
//Hooks
import { useAppSelector } from '../../store/hooks';

interface PrimaryUserProtectedProps {
    showFallback?: boolean;
}

const PrimaryUserProtected: React.FC<PrimaryUserProtectedProps> = ({ 
    children,
    showFallback 
}) => {
    /**
     * Hooks
     */
    //Redux state
    const { type: userType = 'SECONDARY' } = useAppSelector(state => state?.user);

    return userType === ValidUserTypes.PRIMARY
    ? <>{ children }</>
    : showFallback
        ? <NotFound />
        : null;
}

export default PrimaryUserProtected;