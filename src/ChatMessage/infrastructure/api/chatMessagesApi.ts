//Domain
import { ChatMessagePrimitives } from '../../domain/ChatMessage';
//Requests manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest'

/**
 * @author Damian Alanis Ramirez
 * @version 1.1.1
 * @description API facade for the ChatMessage entity.
 */

interface GetChatMessagesParameters {
    chatId: string;
    startingAt?: string;
}

export const getChatMessages = async ({
    chatId,
    startingAt
}: GetChatMessagesParameters): Promise<PaginatedChatMessages> => {
    try {
        //We make the request to the endpoint providing the query parameters
        const response = await AxiosRequest.get(
            `/chat/${ chatId }/messages/?startingAt=${ startingAt }`
        );
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}

//Helper types
export interface PaginatedChatMessages {
    data: ChatMessagePrimitives[];
    next: string | null;
}