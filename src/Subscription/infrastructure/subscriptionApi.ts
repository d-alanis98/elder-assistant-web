//Domain
import { SubscriptionPrimitives } from '../domain/Subscription';
//Requests manager
import AxiosRequest from '../../Shared/infrastructure/Requests/AxiosRequest';

/**
 * @author Damián Alanís Ramírez
 * @version 1.1.1
 * @description Subscriptions entity API facade.
 */

export const getRequestedSubscriptions = async (): Promise<SubscriptionPrimitives[]> => {
    const response = await AxiosRequest.get('/user/requested-subscriptions');
    return response.data;
} 

export const requestSubscription = async (primaryUserId: string): Promise<SubscriptionPrimitives> => {
    const response = await AxiosRequest.post(
        `/user/${ primaryUserId }/subscribe`,
        { }
    );
    return response.data;
}