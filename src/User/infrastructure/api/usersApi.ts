//Domain
import { UserPrimitives } from '../../domain/User';
//Shared domain
import PaginatedResult from '../../../Shared/domain/PaginatedResult';
import { QueryParameters } from '../../../Shared/domain/QueryParamters';
//Request manager
import AxiosRequest from '../../../Shared/infrastructure/Requests/AxiosRequest';


export interface GetUsersByName extends QueryParameters {
    name: string;
}

export const getUsersByName = async ({
    name,
    startingAt
}: GetUsersByName): Promise<UsersList> => {
    const response = await AxiosRequest.get(
        `/users/?name=${ name }&startingAt=${ startingAt }`
    );
    return response.data;
}

export const getUserByID = async (userId: string): Promise<UserPrimitives> => {
    const response = await AxiosRequest.get(`/user/${ userId }`);
    return response.data;
}

//Types
type UsersList = PaginatedResult<UserPrimitives>;