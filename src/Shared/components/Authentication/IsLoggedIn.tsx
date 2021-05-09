import React from 'react';
//Hooks
import { useAppSelector } from '../../store/hooks'



const IsLoggedIn: React.FC = ({ children }) => {
    /**
     * Hooks
     */
    //Custom, to get the redux store
    const { loggedIn } = useAppSelector(state => state.user);


    return loggedIn
        ? <>{ children }</>
        : null;
}

export default IsLoggedIn;