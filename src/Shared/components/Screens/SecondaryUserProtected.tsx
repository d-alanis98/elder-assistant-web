import React from 'react';
//Domain
import { ValidUserTypes } from '../../../User/domain/User';
//Hooks
import { useAppSelector } from '../../store/hooks';


const SecondaryUserProtected: React.FC = ({ children }) => {
    /**
     * Hooks
     */
    //Redux state
    const { type: userType = 'SECONDARY' } = useAppSelector(state => state?.user);

    return userType === ValidUserTypes.SECONDARY
    ? <>{ children }</>
    : null;
}

export default SecondaryUserProtected;