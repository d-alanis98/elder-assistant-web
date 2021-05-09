//Domain
import { ChatPrimitives } from '../../domain/Chat';
//Infrastructure
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Facade to access chat API endpoints.
 */

export const getChats = async (): Promise<ChatPrimitives[]> => {
    try {
        const response = await AxiosRequest.get('/chats');
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}