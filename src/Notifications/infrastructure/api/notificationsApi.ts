//Domain
import { NotificationPrimitives } from '../../domain/Notifications';
//Shared domain
import PaginatedResult from '../../../Shared/domain/PaginatedResult';
import { QueryParameters } from '../../../Shared/domain/QueryParamters';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';

/**
 * Method to get the notifications by requesting the paginated data to the API endpoint.
 * @param {number} limit Number of records to fetch.
 * @param {string} startingAt Starting point of the paginated result.
 * @returns 
 */
export const getNotifications = async ({
    limit,
    startingAt
}: QueryParameters): 
Promise<PaginatedResult<NotificationPrimitives>> => {
    const response = await AxiosRequest.get(
        `/notifications/?limit=${ limit }&startingAt=${ startingAt }`
    );
    return response.data;
}