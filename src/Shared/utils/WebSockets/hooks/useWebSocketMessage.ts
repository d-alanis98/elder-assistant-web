import { useContext, useEffect } from 'react';
//Context
import WebSocketsContext from '../context/WebSocketsContext';


const useWebSocketMessage = (
    onMessage: MessageHandler,
    messageType: string
): void => {
    /**
     * Hooks
     */
    //Context
    const webSocket = useContext(WebSocketsContext);
    //Callbacks
    useEffect(() => {
        //Event listener
        (async function() {
            //Validations
            if(!webSocket)
                return;
            if(!webSocket.isWebSocketOpen())
                await webSocket.connectingWebSocket();
            if(!webSocket.instance)
                return
            //Handler
            webSocket.instance.onmessage = ({ 
                data 
            }) => {
                const parsedMessage: WebSocketMessage = JSON.parse(data);
                if(parsedMessage.type !== messageType)
                    return;
                //We validate the message type
                onMessage(parsedMessage.payload);
            };
        })()
    }, [
        webSocket,
        onMessage,
        messageType
    ]);
}

export default useWebSocketMessage;


//Types
interface WebSocketMessage {
    type: string;
    payload: any;
}

type MessageHandler = (message: any) => void;