//Domain
import { Nullable } from '../../../domain/Nullable';
//Helpers
import JWTManager from '../../Security/JWTManager';


/**
 * @author Damian Alanis Ramirez
 * @version 2.2.3
 * @description Web sockets helper class.
 */
export default class WebSocketManager {
    //Constants
    private readonly RETRY_TIME = 500;
    //Properties
    private webSocket: Nullable<WebSocket>;
    private messageHandler: MessageHandler = (_) => { };
    private retryOperations: Boolean = true;

    constructor() {
        this.createWebSocket();
    }

    public get instance() {
        return this.webSocket;
    }

    /**
     * Method to create a WS connection.
     */
    createWebSocket = () => {
        this.webSocket = new WebSocket(
            `ws://${ process.env.REACT_APP_SERVER_IP }` || ''
        );
    }
    
    /**
     * Method to determine if a WS connection is OPEN.
     * @returns {Boolean}
     */
    isWebSocketOpen = () => this.webSocket && this.webSocket.readyState === WebSocket.OPEN;

    /**
     * Method to await the connection of the socket.
     * @returns 
     */
    connectingWebSocket = () => new Promise<void>((resolve, reject) => {
        if(!this.webSocket)
            return reject('WebSocket not created');
        this.webSocket.onopen = () => {
            if(!this.webSocket)
                return reject('WebSocket not created');
            //We add the message handler
            this.webSocket.onmessage = ev => {
                this.messageHandler(ev);
            }
            //We log the success result
            console.debug('WS connected');
            console.debug('Message handler set');
            resolve();
        }
        this.webSocket.onerror = this.webSocket.onclose = () => {
            this.onWebSocketError();
            reject('Connection error');
        }
    });

    /**
     * Method to authenticate the WS connection.
     * @param authenticationToken Authentication JWT token.
     */
    authenticateConnection = async (authenticationToken: string): Promise<void> => {
        if(JWTManager.isExpiredToken(authenticationToken))
            throw new Error('Token has expired');
        this.sendMessage('Authentication', `Bearer ${ authenticationToken }`);
    }

    /**
     * Method to send a message through the WS. 
     * @param {string} type Message type.
     * @param {any} payload Message content.
     * @returns 
     */
    sendMessage = async (type: string, payload: any): Promise<void> => {
        try {
            if(!this.webSocket)
                await this.retryConnection();
            if(!this.isWebSocketOpen())
                await this.connectingWebSocket();
                //We send the serialized message
            this.webSocket?.send(JSON.stringify({
                type,
                payload
            }));
        } catch(error) {
            this.retryOperation(() => this.sendMessage(type, payload));
            return Promise.reject(error.message);
        }
    }

    /**
     * Method to retry the WS connection after the default time.
     */
    retryConnection = async () => {
        this.retryOperation(() => this.createWebSocket());
    }

    /**
     * Method to retry an operation after a certain time.
     * @param {Function} operation Operation to retry.
     * @returns 
     */
    retryOperation = (operation: () => void) => new Promise<void>((resolve, _) => (
        this.retryOperations && setTimeout(() => {
            operation?.();
            resolve();
        }, this.RETRY_TIME)
    ));

    /**
     * Web socket connection error handler.
     */
    onWebSocketError = () => {
        this.webSocket = null;
        this.retryOperations = true;
        console.error('Connection error, retrying connection');
    }

    onWebSocketMessage = (handler: MessageHandler) => {
        this.messageHandler = handler;
    }


}

//Types
type MessageHandler = ({ data }: MessageEvent) => void | Promise<void>;