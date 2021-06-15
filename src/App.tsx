import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components';
//Domain
import OnUpdatedAuthToken from './UserAuthentication/domain/event-handlers/OnUpdatedAuthToken';
//Components
import Alert from './Alerts/components/Alert';
import Routes from './Shared/components/Routes/Routes';
import RequestErrorHandler from './Shared/infrastructure/Errors/RequestErrorHandler';
import AxiosRequest from './Shared/infrastructure/Requests/AxiosRequest';
//Hooks
import useRegisterServices from './Shared/hooks/useRegisterServices';
import { useNotificationServices } from './Shared/components/Notifications/hooks/useNotificationServices';
import { useAppDispatch, useAppSelector } from './Shared/store/hooks';
//HOC
import withWebSocketsContextProvider from './Shared/utils/WebSockets/context/HOC/withWebSocketsContextProvider';

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

    //We register the main services (mainly related to WebSockets messages)
    useRegisterServices();
    useNotificationServices();

    //Render
    return (
        <ThemeProvider
            theme = { themeToApply }
        >
            <Alert />
            <Routes />
        </ThemeProvider>
    );
}

//We apply the web socket context provider decorator
const WithWebSocketContextProvider = withWebSocketsContextProvider(App);
//We export the decorated component
export default WithWebSocketContextProvider;
