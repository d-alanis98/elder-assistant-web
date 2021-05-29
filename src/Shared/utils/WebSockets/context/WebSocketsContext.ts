import { createContext } from 'react';
import WebSocketManager from '../utils/WebSocketManager';

const WebSocketsContext = createContext<WebSocketsContextType>(null);


export default WebSocketsContext;


export type WebSocketsContextType = WebSocketManager | null;