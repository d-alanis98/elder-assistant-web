import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components';
//Components
import Routes from './Shared/components/Routes/Routes';
import RequestErrorHandler from './Shared/infrastructure/Errors/RequestErrorHandler';
import AxiosRequest from './Shared/infrastructure/Requests/AxiosRequest';
//Hooks
import { useAppDispatch, useAppSelector } from './Shared/store/hooks';
import OnUpdatedAuthToken from './UserAuthentication/domain/event-handlers/OnUpdatedAuthToken';

const App: React.FC = () => {
    /**
     * Hooks
     */
    //Custom hooks
    //State selector
    const { theme: themeToApply } = useAppSelector(state => state.theme);
    const { token, loggedIn, refreshToken } = useAppSelector(state => state.user);
    //Actions dispatcher
    const dispatch = useAppDispatch();
    //Effects
    /**
     * On mount, we want to register our services
     */
    useEffect(() => {
        //We set some properties
        AxiosRequest.token = token;
        AxiosRequest.loggedIn = loggedIn;
        AxiosRequest.refreshToken = refreshToken;
        AxiosRequest.onRequestError = new RequestErrorHandler(dispatch).handle;
        AxiosRequest.onNewAuthToken = new OnUpdatedAuthToken(dispatch).handle;
        //We set the axios instance (to set the interceptors)
        AxiosRequest.setInstance();
    }, [
        token,
        dispatch,
        loggedIn, 
        refreshToken
    ]);
    
    return (
        <ThemeProvider
            theme = { themeToApply }
        >
            <Routes />
        </ThemeProvider>
    );
}

export default App;
