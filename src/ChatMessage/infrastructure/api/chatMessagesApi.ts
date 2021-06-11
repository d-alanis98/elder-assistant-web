//Domain
import { ChatPrimitives } from '../../../Chat/domain/Chat';
import { ChatMessagePrimitives } from '../../domain/ChatMessage';
//Requests manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';

/**
 * @author Damian Alanis Ramirez
 * @version 1.2.1
 * @description API facade for the ChatMessage entity.
 */

interface GetChatMessagesParameters {
    chat: ChatPrimitives;
    startingAt?: string;
}

export const getChatMessages = async ({
    chat,
    startingAt
}: GetChatMessagesParameters): Promise<PaginatedChatMessages> => {
    try {
        //We make the request to the endpoint providing the query parameters
        const response = await AxiosRequest.get(
            `/chat/${ chat._id }/messages/?startingAt=${ startingAt }&primaryUserId=${ chat.ownedBy }`
        );
        return response.data;
    } catch(error) {
        return Promise.reject(error);
    }
}

interface PostTextMessage {
    chat: ChatPrimitives;
    content: string;
}

export const sendChatTextMessage = async ({
    chat,
    content
}: PostTextMessage) => {
    try {
        const response = await AxiosRequest.post(
            `/chat/${ chat._id }/message`,
            { 
                content, 
                primaryUserId: chat.ownedBy
            }
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
