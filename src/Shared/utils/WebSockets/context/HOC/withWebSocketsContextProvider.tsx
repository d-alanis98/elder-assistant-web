import React, { useEffect, useState } from 'react';
//Context
import WebSocketsContext, { WebSocketsContextType } from '../WebSocketsContext';
//Hooks
import { useAppSelector } from '../../../../store/hooks';
//Helpers
import WebSocketManager from '../../utils/WebSocketManager';


const withWebSocketsContextProvider = (WrappedComponent: React.ComponentType): React.FC => {
    const WithWebSocketsContextProvider: React.FC = ({ ...props }) => {
        /**
         * Hooks
         */
        //State selector
        const { token } = useAppSelector(state => state.user);
        //Local state
        const [webSocket, setWebSocket] = useState<WebSocketsContextType>(null);
        //Effects
        useEffect(() => {
            setWebSocket(new WebSocketManager());
        }, []);

        useEffect(() => {
            if(!token || !webSocket)
                return;
            webSocket.authenticateConnection(token);
        }, [token, webSocket]);


        return (
            <WebSocketsContext.Provider
                value = { webSocket }
            >
                <WrappedComponent 
                    { ...props }
                />
            </WebSocketsContext.Provider>
        )
    }

    return WithWebSocketsContextProvider;
}

export default withWebSocketsContextProvider;